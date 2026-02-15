
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { BlogPost } from '../../types';
import { Edit2, Trash2, Plus, X, Upload, Image as ImageIcon, AlertTriangle } from 'lucide-react';

const BlogManager: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const initialFormState: Omit<BlogPost, 'id'> = {
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    image: '',
    content: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData(post);
    } else {
      setEditingPost(null);
      setFormData({
        ...initialFormState,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateBlogPost({ ...formData, id: editingPost.id });
    } else {
      addBlogPost({ ...formData, id: Date.now().toString() });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteBlogPost(deleteId);
      setDeleteId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">Share news and updates with your customers.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={18} /> New Post
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                </td>
                <td className="px-6 py-4">
                   <div className="font-medium text-gray-900">{post.title}</div>
                   <div className="text-xs text-gray-400 truncate max-w-[200px]">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button type="button" onClick={() => handleOpenModal(post)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button 
                    type="button" 
                    onClick={() => setDeleteId(post.id)} 
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogPosts.length === 0 && (
          <div className="p-8 text-center text-gray-500">No posts yet. Create one to engage your audience.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900">{editingPost ? 'Edit Post' : 'New Blog Post'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                 <div className="flex items-center gap-4">
                    <div className="relative w-32 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center group">
                        {formData.image ? (
                           <>
                             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button type="button" variant="ghost" size="sm" className="text-white hover:text-white" onClick={() => setFormData({...formData, image: ''})}>
                                 <Trash2 size={16} />
                               </Button>
                             </div>
                           </>
                        ) : (
                           <ImageIcon className="text-gray-400" size={24} />
                        )}
                    </div>
                    <div className="flex-grow">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                            <Upload size={16} />
                            Upload Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-bold bg-white text-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description)</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm bg-white text-gray-900" placeholder="Write your article content here..." />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingPost ? 'Save Changes' : 'Publish Post'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
