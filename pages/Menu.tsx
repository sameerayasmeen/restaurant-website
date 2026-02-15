import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { Button } from '../components/ui/Button';
import { Search } from 'lucide-react';

const Menu: React.FC = () => {
  const { menuItems, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const categories: (Category | 'All')[] = ['All', 'Burgers', 'Wraps', 'Fries', 'Shakes', 'Combos'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gray-900 text-white pt-24 pb-32 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
         
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Menu</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Handcrafted burgers, crispy sides, and thick shakes. 
            <br />Made fresh when you order.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Category Filter */}
        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-wrap justify-center gap-2 mb-12 border border-gray-100 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} className={`bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-300 group ${!item.isAvailable ? 'opacity-75 grayscale' : ''}`}>
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-extrabold text-sm uppercase tracking-widest border-2 border-white px-6 py-3 rounded-lg">Sold Out</span>
                  </div>
                )}
                {item.isPopular && item.isAvailable && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                    Bestseller
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-gray-900/90 backdrop-blur-md text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
                    ₹{item.price}
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed h-10">{item.description}</p>
                <Button 
                  disabled={!item.isAvailable} 
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-3 rounded-xl transition-all duration-200 ${justAdded === item.id ? 'bg-green-600 border-green-600 hover:bg-green-700' : ''}`}
                  variant={item.isAvailable ? 'primary' : 'secondary'}
                >
                  {!item.isAvailable ? 'Unavailable' : justAdded === item.id ? 'Added to Tray!' : 'Add to Order'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-32 text-gray-400">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="opacity-50"/>
             </div>
            <p className="text-lg font-medium">No yummy items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;