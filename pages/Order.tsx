import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CheckCircle, MapPin, Phone, User } from 'lucide-react';
import { Order as OrderType } from '../types';

const Order: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, placeOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    type: 'Delivery' as 'Delivery' | 'Pickup' | 'Dine-in'
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.type === 'Delivery' ? 40 : 0;
  const finalTotal = total + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: OrderType = {
      id: Date.now().toString(),
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      type: formData.type,
      items: [...cart],
      total: finalTotal,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    placeOrder(newOrder);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center max-w-lg w-full border border-gray-100">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-sm">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-500 mb-8 text-lg leading-relaxed">
            Your delicious food is being prepared. We'll contact you at <span className="font-bold text-gray-900">{formData.phone}</span> regarding your {formData.type.toLowerCase()}.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/')} variant="outline" className="rounded-xl">Back Home</Button>
            <Button onClick={() => navigate('/menu')} className="rounded-xl">Order More</Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Tray is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any yummy items yet.</p>
          <Link to="/menu">
            <Button size="lg" className="rounded-full px-8">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
          {step === 'cart' ? 'Your Tray' : 'Checkout Details'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Cart Items */}
          <div className={`lg:w-2/3 space-y-4 ${step === 'details' ? 'hidden lg:block opacity-75 pointer-events-none' : ''}`}>
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                  <p className="text-orange-600 font-bold">₹{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 transition-colors">
                    {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                  </button>
                  <span className="font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-green-600 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {step === 'cart' && (
               <div className="mt-8 text-right">
                  <Link to="/menu" className="text-orange-600 font-bold hover:underline">Add more items</Link>
               </div>
            )}
          </div>

          {/* Right Column: Summary & Checkout Form */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{total}</span>
                </div>
                {formData.type === 'Delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-gray-900">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-orange-600">₹{finalTotal}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <Button onClick={() => setStep('details')} className="w-full py-4 text-lg shadow-orange-500/20 rounded-xl">
                  Proceed to Checkout <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  
                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl mb-6">
                    {['Delivery', 'Pickup', 'Dine-in'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, type: t as any})}
                        className={`text-xs font-bold py-2 rounded-lg transition-all ${formData.type === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="relative group">
                        <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-orange-500 transition-colors"><User size={18} /></div>
                        <input required type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-sm" />
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-orange-500 transition-colors"><Phone size={18} /></div>
                        <input required type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-sm" />
                    </div>

                    {formData.type === 'Delivery' && (
                       <div className="relative group animate-in fade-in slide-in-from-top-2">
                            <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-orange-500 transition-colors"><MapPin size={18} /></div>
                            <textarea required name="address" placeholder="Delivery Address" value={formData.address} onChange={handleChange} rows={2} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-sm resize-none"></textarea>
                       </div>
                    )}
                    
                    {formData.type === 'Dine-in' && (
                        <div className="relative group animate-in fade-in slide-in-from-top-2">
                            <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-orange-500 transition-colors"><MapPin size={18} /></div>
                            <input required type="text" name="address" placeholder="Table Number (if seated)" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-sm" />
                        </div>
                    )}
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button type="button" variant="ghost" onClick={() => setStep('cart')} className="flex-1 rounded-xl">Back</Button>
                    <Button type="submit" className="flex-[2] rounded-xl shadow-orange-500/20">Place Order</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;