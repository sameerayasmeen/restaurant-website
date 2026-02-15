
export type Category = 'Burgers' | 'Wraps' | 'Fries' | 'Shakes' | 'Combos';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  tagline: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Food Blogger", "Regular Customer"
  content: string;
  rating: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  type: 'Delivery' | 'Pickup' | 'Dine-in';
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface HomepageConfig {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    image: string;
  };
  sections: {
    features: boolean;
    popular: boolean;
    promo: boolean;
    testimonials: boolean;
    cta: boolean;
  };
  promo: {
    title: string;
    subtitle: string;
    description: string;
  };
}
