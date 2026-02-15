
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Reservation, BusinessInfo, Testimonial, BlogPost, CartItem, Order, HomepageConfig } from '../types';
import { INITIAL_MENU, INITIAL_BUSINESS_INFO, INITIAL_TESTIMONIALS, INITIAL_BLOGS, INITIAL_HOMEPAGE_CONFIG } from '../constants';

interface StoreContextType {
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: BusinessInfo) => void;
  
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (config: HomepageConfig) => void;

  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  deleteReservation: (id: string) => void;
  
  testimonials: Testimonial[];
  
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  // Cart & Order
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Global Actions
  resetAllData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_VERSION = 'v16';

// Helper to safely parse JSON from localStorage
const safeParse = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    
    const parsed = JSON.parse(saved);
    if (parsed === null) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    
    return parsed;
  } catch (e) {
    console.error(`Error parsing key ${key}:`, e);
    return fallback;
  }
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => 
    safeParse(`businessInfo_${STORAGE_KEY_VERSION}`, INITIAL_BUSINESS_INFO)
  );

  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => 
    safeParse(`homepageConfig_${STORAGE_KEY_VERSION}`, INITIAL_HOMEPAGE_CONFIG)
  );

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => 
    safeParse(`menuItems_${STORAGE_KEY_VERSION}`, INITIAL_MENU)
  );

  const [reservations, setReservations] = useState<Reservation[]>(() => 
    safeParse(`reservations_${STORAGE_KEY_VERSION}`, [])
  );

  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => 
    safeParse(`blogPosts_${STORAGE_KEY_VERSION}`, INITIAL_BLOGS)
  );

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => 
    safeParse(`cart_${STORAGE_KEY_VERSION}`, [])
  );

  const [orders, setOrders] = useState<Order[]>(() => 
    safeParse(`orders_${STORAGE_KEY_VERSION}`, [])
  );

  // Persistence Effects
  useEffect(() => { localStorage.setItem(`businessInfo_${STORAGE_KEY_VERSION}`, JSON.stringify(businessInfo)); }, [businessInfo]);
  useEffect(() => { localStorage.setItem(`homepageConfig_${STORAGE_KEY_VERSION}`, JSON.stringify(homepageConfig)); }, [homepageConfig]);
  useEffect(() => { localStorage.setItem(`menuItems_${STORAGE_KEY_VERSION}`, JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem(`reservations_${STORAGE_KEY_VERSION}`, JSON.stringify(reservations)); }, [reservations]);
  useEffect(() => { localStorage.setItem(`blogPosts_${STORAGE_KEY_VERSION}`, JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem(`cart_${STORAGE_KEY_VERSION}`, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(`orders_${STORAGE_KEY_VERSION}`, JSON.stringify(orders)); }, [orders]);

  // Actions - Using functional updates to ensure latest state is always used
  const updateBusinessInfo = (info: BusinessInfo) => setBusinessInfo(info);
  const updateHomepageConfig = (config: HomepageConfig) => setHomepageConfig(config);

  const addMenuItem = (item: MenuItem) => setMenuItems(prev => [...prev, item]);
  const updateMenuItem = (updatedItem: MenuItem) => setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  const deleteMenuItem = (id: string) => setMenuItems(prev => prev.filter(item => item.id !== id));

  const addReservation = (reservation: Reservation) => setReservations(prev => [reservation, ...prev]);
  const updateReservationStatus = (id: string, status: Reservation['status']) => setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));
  const deleteReservation = (id: string) => setReservations(prev => prev.filter(res => res.id !== id));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [post, ...prev]);
  const updateBlogPost = (updatedPost: BlogPost) => setBlogPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
  const deleteBlogPost = (id: string) => setBlogPosts(prev => prev.filter(post => post.id !== id));

  // Cart Actions
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => setCart(prev => prev.filter(item => item.id !== itemId));

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (id: string, status: Order['status']) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  const resetAllData = () => {
    if (window.confirm("Are you sure? This will delete all custom items, blog posts, and settings, and restore factory defaults.")) {
      try {
        Object.keys(localStorage).forEach(key => {
          if (key.includes('_v')) { 
            localStorage.removeItem(key);
          }
        });
        window.location.reload();
      } catch (e) {
        console.error("Failed to reset data:", e);
      }
    }
  };

  return (
    <StoreContext.Provider value={{
      businessInfo,
      updateBusinessInfo,
      homepageConfig,
      updateHomepageConfig,
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      reservations,
      addReservation,
      updateReservationStatus,
      deleteReservation,
      testimonials,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      orders,
      placeOrder,
      updateOrderStatus,
      resetAllData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
