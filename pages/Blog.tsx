import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Calendar, ArrowRight, Clock, User, Mail, X, Check, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const { blogPosts } = useStore();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://formspree.io/f/mlgwbegq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            _subject: `New Newsletter Subscription`
          })
        });

        if (response.ok) {
          setSubscribed(true);
          setTimeout(() => {
            setSubscribed(false);
            setEmail('');
          }, 5000);
        } else {
           alert("Something went wrong. Please try again.");
        }
      } catch (error) {
         console.error(error);
         alert("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen animate-in fade-in duration-700">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block animate-in slide-in-from-bottom duration-500">Our Journal</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-in slide-in-from-bottom duration-500 delay-100">Stories & Updates</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom duration-500 delay-200">
            Behind the scenes, new menu launches, and food culture from the heart of Urban Bites.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
        {blogPosts.length > 0 ? (
          <>
            {/* Featured Post */}
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 mb-12 group hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-80 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(blogPosts[0])}>
                   <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 border border-gray-100">
                      Featured
                   </div>
                   <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-orange-500"/> {blogPosts[0].date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-orange-500"/> 5 min read</span>
                  </div>
                  <h2 
                    onClick={() => setSelectedPost(blogPosts[0])}
                    className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div>
                    <Button 
                        onClick={() => setSelectedPost(blogPosts[0])} 
                        variant="outline" 
                        className="rounded-full px-8 border-gray-200 hover:border-orange-500 hover:text-orange-600"
                    >
                        Read Article
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid for remaining posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map(post => (
                <div key={post.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                  <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                     <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-lg border border-gray-100">
                        {post.date}
                     </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 
                        onClick={() => setSelectedPost(post)}
                        className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <button 
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center text-orange-600 font-bold text-sm group/btn cursor-pointer mt-auto hover:text-orange-700"
                    >
                      Read More <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform"/>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Newsletter Card */}
               <div className="bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden relative flex flex-col justify-center p-8 text-white text-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-blue-600/20 group-hover:opacity-150 transition-opacity"></div>
                  <div className="relative z-10 w-full">
                     <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                        {subscribed ? <Check className="text-green-400" size={32} /> : <Mail size={32} className="text-orange-500"/>}
                     </div>
                     
                     {subscribed ? (
                        <div className="animate-in fade-in zoom-in duration-300 py-6">
                            <h3 className="text-2xl font-bold mb-2">Subscribed!</h3>
                            <p className="text-gray-400 text-sm">Thank you for joining our newsletter.</p>
                        </div>
                     ) : (
                         <>
                            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">Get the latest news, secret recipes, and exclusive promo codes delivered to your inbox.</p>
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address" 
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/10 text-sm transition-all disabled:opacity-50" 
                                />
                                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 text-sm disabled:opacity-50 flex justify-center items-center">
                                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Subscribe Now"}
                                </button>
                            </form>
                         </>
                     )}
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Posts Yet</h3>
            <p className="text-gray-500">Check back later for updates from our kitchen.</p>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedPost(null)}>
            <div className="bg-white rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="relative h-48 md:h-56 w-full">
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                    <button 
                        onClick={() => setSelectedPost(null)} 
                        className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40 transition-colors border border-white/20"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={16} className="text-orange-500"/> {selectedPost.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-orange-600 font-bold">Food & Culture</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">{selectedPost.title}</h2>
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                        <p className="font-medium text-xl text-gray-900 mb-6">{selectedPost.excerpt}</p>
                        {selectedPost.content ? (
                            <div className="whitespace-pre-wrap">{selectedPost.content}</div>
                        ) : (
                            <p>Content is loading...</p>
                        )}
                        <div className="my-8 h-px bg-gray-100"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className="mt-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                     <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                        <Button onClick={() => setSelectedPost(null)} variant="secondary" className="rounded-xl">Close Article</Button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Blog;