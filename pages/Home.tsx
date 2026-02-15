
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Star, ArrowRight, Utensils, Leaf, Zap, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { menuItems, addToCart, homepageConfig, testimonials } = useStore();
  const popularItems = menuItems.filter(item => item.isPopular).slice(0, 4);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by one card width approximately (full width on mobile, half width on desktop)
      const scrollAmount = current.offsetWidth < 768 ? current.offsetWidth : current.offsetWidth / 2;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Optimized Hero Section with Performance Enhancements */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-yellow-50 rounded-full blur-3xl opacity-60 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-24 md:pb-32">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Hero Text */}
            <div className="md:w-1/2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wide mb-8 border border-orange-200 shadow-sm animate-in slide-in-from-bottom duration-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                {homepageConfig.hero.badge}
              </div>
              <h1 
                className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight animate-in slide-in-from-bottom duration-700 delay-100"
                dangerouslySetInnerHTML={{ __html: homepageConfig.hero.headline }}
              />
              <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium animate-in slide-in-from-bottom duration-700 delay-200">
                {homepageConfig.hero.subheadline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-in slide-in-from-bottom duration-700 delay-300">
                <Link to="/menu">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl shadow-orange-500/20">Order Now</Button>
                </Link>
                <Link to="/reservation">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10 py-4">Book Table</Button>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center md:justify-start gap-8 text-sm font-semibold text-gray-400 animate-in fade-in duration-1000 delay-500">
                <div className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-default">
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>Free Delivery
                </div>
                <div className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-default">
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>20 Min Prep
                </div>
                <div className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-default">
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>Fresh Halal
                </div>
              </div>
            </div>
            
            {/* Hero Image with Floating Elements & Lazy Loading */}
            <div className="md:w-1/2 relative">
              <div className="relative z-10 animate-in slide-in-from-right duration-1000 fade-in">
                <img 
                  src={homepageConfig.hero.image} 
                  alt="Urban Bites Signature Burger" 
                  loading="lazy"
                  className="rounded-[2.5rem] shadow-2xl shadow-orange-900/20 transform md:rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-[1.02] border-4 border-white"
                />
                
                {/* Floating Badge 1: Rating */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom duration-1000 delay-300 fade-in border border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Top Rated</p>
                    <p className="text-xl font-extrabold text-gray-900">4.9/5.0</p>
                  </div>
                </div>

                {/* Floating Badge 2: Orders */}
                <div className="absolute top-10 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right duration-1000 delay-500 fade-in border border-gray-100 hidden lg:flex">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">10k+ Orders</p>
                </div>
              </div>
              
              {/* Image Shadow Backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-orange-100 rounded-[3rem] -z-10 scale-95 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {homepageConfig.sections.features && (
        <section className="py-20 bg-gradient-to-b from-white to-orange-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Leaf size={32} />, title: "100% Fresh", desc: "Locally sourced organic ingredients delivered daily.", color: "text-green-600", bg: "bg-green-100" },
                { icon: <Zap size={32} />, title: "Lightning Fast", desc: "From grill to plate in 30 minutes or less.", color: "text-yellow-600", bg: "bg-yellow-100" },
                { icon: <ShieldCheck size={32} />, title: "Top Quality", desc: "Award-winning hygiene and premium meat cuts.", color: "text-blue-600", bg: "bg-blue-100" },
                { icon: <Utensils size={32} />, title: "Diverse Menu", desc: "50+ items including vegan and keto options.", color: "text-purple-600", bg: "bg-purple-100" },
              ].map((item, idx) => (
                <div key={idx} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 mx-auto ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Items */}
      {homepageConfig.sections.popular && (
        <section className="py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-orange-600 font-extrabold tracking-widest uppercase text-xs mb-2 block">Our Menu Highlights</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Popular This Week</h2>
              </div>
              <Link to="/menu" className="group flex items-center gap-2 text-gray-900 font-bold bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
                View Full Menu <ArrowRight size={18} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-extrabold text-gray-900 shadow-sm border border-gray-100">
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="px-2 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{item.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-grow">{item.description}</p>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className={`w-full rounded-xl py-3 ${justAdded === item.id ? 'bg-green-600 border-green-600 hover:bg-green-700' : ''}`}
                      variant="secondary" 
                      size="sm"
                    >
                      {justAdded === item.id ? 'Added!' : 'Add to Tray'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {homepageConfig.sections.testimonials && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-3xl -mr-40 -mt-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Navigation Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <span className="text-orange-600 font-extrabold tracking-widest uppercase text-xs mb-2 block">What People Say</span>
                  <h2 className="text-4xl font-extrabold text-gray-900">Customer Love</h2>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all active:scale-95 bg-white shadow-sm"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition-all active:scale-95"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-4 px-4 md:mx-0 md:px-0 focus:outline-none"
                tabIndex={0}
            >
              {testimonials.map((testimonial) => (
                <div 
                    key={testimonial.id} 
                    className="min-w-[85vw] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] snap-center bg-gray-50 p-8 rounded-[2rem] relative hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                >
                   {/* Quote Icon */}
                   <div className="absolute top-8 right-8 text-orange-200">
                      <Quote size={48} fill="currentColor" className="opacity-50" />
                   </div>
                   
                   <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                      ))}
                   </div>
                   
                   <p className="text-gray-600 text-lg mb-8 leading-relaxed relative z-10 font-medium italic flex-grow">"{testimonial.content}"</p>
                   
                   <div className="flex items-center gap-4 mt-auto">
                      <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Section */}
      {homepageConfig.sections.promo && (
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              <div className="relative z-10 px-8 py-20 md:p-24 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">{homepageConfig.promo.subtitle}</span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: homepageConfig.promo.title }} />
                  <p className="text-xl text-gray-300 mb-10 max-w-xl font-medium leading-relaxed">{homepageConfig.promo.description}</p>
                  <Link to="/menu"><Button size="lg" className="px-10 py-4 text-lg border-2 border-orange-500 bg-orange-500 hover:bg-orange-600 text-white rounded-full">Grab Offer</Button></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
