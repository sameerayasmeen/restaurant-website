
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { MenuItem } from '../../types';
import { Edit2, Trash2, Plus, X, Upload, Image as ImageIcon, AlertTriangle } from 'lucide-react';

const MenuManager: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State
  const initialFormState: Omit<MenuItem, 'id'> = {
    name: '',
    description: '',
    price: 0,
    category: 'Burgers',
    image: '',
    isAvailable: true,
    isPopular: false
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem({ ...formData, id: editingItem.id });
    } else {
      addMenuItem({ ...formData, id: Date.now().toString() });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMenuItem(deleteId);
      setDeleteId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
           <h1 className="text-2xl font-bold text-gray-900">Menu Manager</h1>
           <p className="text-gray-500">Add, edit, or remove dishes from your menu.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={18} /> Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {item.name}
                    {item.isPopular && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold uppercase">Popular</span>}
                  </div>
                  <div className="text-xs text-gray-400">{item.category}</div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{item.price}</td>
                <td className="px-6 py-4">
                  <button 
                    type="button"
                    onClick={() => updateMenuItem({...item, isAvailable: !item.isAvailable})}
                    className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${item.isAvailable ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                  >
                    {item.isAvailable ? 'Active' : 'Unavailable'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button type="button" onClick={() => handleOpenModal(item)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button 
                    type="button" 
                    onClick={() => setDeleteId(item.id)} 
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900">{editingItem ? 'Edit Item' : 'New Menu Item'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                 <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center group">
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
                           <ImageIcon className="text-gray-400" size={32} />
                        )}
                    </div>
                    <div className="flex-grow">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                            <Upload size={16} />
                            Upload New Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                        <p className="mt-2 text-xs text-gray-500">Max size: 2MB.</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900">
                  {['Burgers', 'Wraps', 'Fries', 'Shakes', 'Combos'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-900" />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">Popular</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingItem ? 'Save Changes' : 'Create Item'}</Button>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Item?</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this menu item? This action cannot be undone.</p>
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

export default MenuManager;
