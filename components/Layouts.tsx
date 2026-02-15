
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  Menu, X, MapPin, Phone, Instagram, Facebook, Twitter, 
  LayoutDashboard, Coffee, Calendar, Settings, LogOut, ChevronRight, ShoppingBag, BookOpen, PenTool, RefreshCcw, Sliders
} from 'lucide-react';

// --- PUBLIC LAYOUT ---

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { businessInfo, cart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path 
    ? "text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-lg" 
    : "text-gray-600 hover:text-orange-600 px-3 py-1 font-medium transition-colors";

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">U</div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 leading-none tracking-tight">Urban Bites</h1>
                <span className="text-[10px] text-orange-600 font-bold tracking-widest uppercase">Eats & Treats</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className={isActive("/")}>Home</Link>
              <Link to="/menu" className={isActive("/menu")}>Menu</Link>
              <Link to="/about" className={isActive("/about")}>About</Link>
              <Link to="/contact" className={isActive("/contact")}>Contact</Link>
              
              {/* Cart Button */}
              <Link to="/order" className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors">
                 <ShoppingBag size={22} />
                 {cartCount > 0 && (
                   <span className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                     {cartCount}
                   </span>
                 )}
              </Link>

              <Link to="/reservation" className="ml-4 bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 transform hover:-translate-y-0.5">
                Book Table
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <Link to="/order" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
                 <ShoppingBag size={24} />
                 {cartCount > 0 && (
                   <span className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 absolute w-full shadow-2xl animate-in slide-in-from-top-2 z-40">
            <div className="px-6 py-6 space-y-3">
              <Link to="/" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/menu" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>Menu</Link>
              <Link to="/order" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                  My Order 
                  {cartCount > 0 && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">{cartCount} Items</span>}
              </Link>
              <Link to="/about" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              
              <div className="h-px bg-gray-100 my-2"></div>
              <Link to="/admin" className="block px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <LayoutDashboard size={16} /> Admin Dashboard
              </Link>

              <Link to="/reservation" className="block w-full text-center mt-4 bg-orange-600 text-white px-4 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30" onClick={() => setIsMenuOpen(false)}>
                Book a Table
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-4">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                <span className="text-xl font-bold">Urban Bites</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                {businessInfo.tagline}. We believe in serving food that makes your soul smile. Fast, fresh, and always affordable.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h4 className="text-base font-bold mb-6 text-white tracking-wide">Explore</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-orange-500 transition-colors flex items-center gap-1"><ChevronRight size={14}/> Home</Link></li>
                <li><Link to="/menu" className="hover:text-orange-500 transition-colors flex items-center gap-1"><ChevronRight size={14}/> Menu</Link></li>
                <li><Link to="/reservation" className="hover:text-orange-500 transition-colors flex items-center gap-1"><ChevronRight size={14}/> Book Table</Link></li>
                <li><Link to="/blog" className="hover:text-orange-500 transition-colors flex items-center gap-1"><ChevronRight size={14}/> Our Blog</Link></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-3">
              <h4 className="text-base font-bold mb-6 text-white tracking-wide">Visit Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-orange-500">
                    <MapPin size={16} />
                  </div>
                  <span className="leading-tight mt-1">{businessInfo.address}</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-orange-500">
                    <Phone size={16} />
                  </div>
                  <span className="mt-1">{businessInfo.phone}</span>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
               <h4 className="text-base font-bold mb-6 text-white tracking-wide">Hours</h4>
               <div className="bg-gray-800 rounded-xl p-4 text-center">
                  <p className="text-xs text-orange-400 font-bold uppercase mb-1">Open Everyday</p>
                  <p className="text-sm font-bold text-white">11:00 AM</p>
                  <p className="text-xs text-gray-500 my-1">TO</p>
                  <p className="text-sm font-bold text-white">11:00 PM</p>
               </div>
               <Link to="/admin" className="block text-center mt-6 text-xs text-gray-600 hover:text-gray-400">Admin Access</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-xs text-gray-500 font-medium">&copy; {new Date().getFullYear()} Urban Bites Café. Crafted with <span className="text-red-500">♥</span> for foodies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- ADMIN LAYOUT ---

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { resetAllData } = useStore();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Menu Manager', path: '/admin/menu', icon: <Coffee size={20} /> },
    { label: 'Reservations', path: '/admin/reservations', icon: <Calendar size={20} /> },
    { label: 'Blog Posts', path: '/admin/blog', icon: <BookOpen size={20} /> },
    { label: 'Site Config', path: '/admin/config', icon: <Sliders size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="h-20 flex items-center px-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-orange-600 transition-colors">A</div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">Admin<span className="text-orange-600">Portal</span></span>
          </Link>
        </div>
        
        <div className="px-4 py-2 flex-grow overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Modules</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 space-y-2 border-t border-gray-100 bg-gray-50/50">
          <button 
            onClick={resetAllData}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-orange-600 hover:bg-orange-100 rounded-xl transition-colors group"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Restore Factory
          </button>
          
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile Admin Header */}
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
          <span className="font-bold text-gray-900">Admin Portal</span>
          <div className="flex gap-2">
             <Link to="/admin" className="p-2 bg-gray-100 rounded-lg"><LayoutDashboard size={20} /></Link>
             <Link to="/" className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-2 rounded-lg flex items-center"><LogOut size={16}/></Link>
          </div>
        </header>

        {/* Dynamic Admin Content */}
        <main className="flex-grow p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
