
import { BusinessInfo, MenuItem, Testimonial, BlogPost, HomepageConfig } from './types';

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
  name: "Urban Bites Café",
  address: "Shop No. 12, Ground Floor, City Center Plaza, MG Road, Bengaluru",
  phone: "+91 98765 43210",
  email: "hello@urbanbites.in",
  openingHours: "Mon – Sun, 11:00 AM – 11:00 PM",
  tagline: "Fresh • Fast • Affordable",
  socials: {
    instagram: "https://instagram.com/urbanbitescafe",
    facebook: "https://facebook.com/urbanbitescafe",
    twitter: "https://x.com/urbanbitescafe"
  }
};

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    badge: "OPEN FOR DELIVERY & DINE-IN",
    headline: "Satisfy Your <br /> <span class='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'>Cravings</span> Instantly.",
    subheadline: "Experience the crunch, the spice, and the freshness. Urban Bites brings you gourmet fast food that feels like home.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
  },
  sections: {
    features: true,
    popular: true,
    promo: true,
    testimonials: true,
    cta: true
  },
  promo: {
    title: "Super Family <br /><span class='text-orange-500'>Combo Deal</span>",
    subtitle: "Limited Time Offer",
    description: "Get 2 Urban Legend Burgers, 2 Large Peri-Peri Fries, and 2 Thick Shakes for just ₹599. Perfect for weekend binges."
  }
};

export const INITIAL_MENU: MenuItem[] = [
  // BURGERS
  {
    id: '1',
    name: "Urban Legend Burger",
    description: "Double patty, melted cheese, caramelized onions, and our secret sauce.",
    price: 249,
    category: 'Burgers',
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },
  {
    id: '6',
    name: "Classic Chicken Burger",
    description: "Juicy chicken patty with lettuce, tomato and mayo.",
    price: 199,
    category: 'Burgers',
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },
  {
    id: '11',
    name: "BBQ Bacon Smash",
    description: "Smashed beef patty, crispy bacon, cheddar, onion rings, and smokey BBQ sauce.",
    price: 279,
    category: 'Burgers',
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },

  // WRAPS
  {
    id: '2',
    name: "Spicy Paneer Wrap",
    description: "Crispy paneer strips tossed in schezwan sauce wrapped in a tortilla.",
    price: 189,
    category: 'Wraps',
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },
  {
    id: '7',
    name: "Grilled Chicken Tikka Wrap",
    description: "Smoky chicken tikka chunks with mint chutney and fresh onions.",
    price: 219,
    category: 'Wraps',
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },
  {
    id: '12',
    name: "Mediterranean Falafel Wrap",
    description: "Crunchy falafel, hummus, pickled veggies, and tahini sauce in a soft pita.",
    price: 199,
    category: 'Wraps',
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },

  // FRIES
  {
    id: '3',
    name: "Peri-Peri Fries",
    description: "Golden crispy fries dusted with spicy peri-peri seasoning.",
    price: 129,
    category: 'Fries',
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },
  {
    id: '8',
    name: "Cheesy Loaded Fries",
    description: "Crispy fries topped with liquid cheese, jalapeños, and herbs.",
    price: 169,
    category: 'Fries',
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },
  {
    id: '13',
    name: "Sweet Potato Fries",
    description: "Hand-cut sweet potatoes fried to perfection, served with chipotle mayo.",
    price: 149,
    category: 'Fries',
    image: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },

  // SHAKES
  {
    id: '4',
    name: "Chocolate Oreo Shake",
    description: "Thick, creamy chocolate shake blended with crunchy Oreo bits.",
    price: 169,
    category: 'Shakes',
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },
  {
    id: '9',
    name: "Strawberry Bliss Shake",
    description: "Fresh strawberries blended with vanilla ice cream and chilled milk.",
    price: 159,
    category: 'Shakes',
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },
  {
    id: '14',
    name: "Salted Caramel Pretzel Shake",
    description: "Vanilla bean ice cream blended with salted caramel sauce and crushed pretzels.",
    price: 179,
    category: 'Shakes',
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },

  // COMBOS
  {
    id: '5',
    name: "Family Combo Meal",
    description: "2 Burgers, 2 Fries, and 2 Cokes. Perfect for sharing.",
    price: 599,
    category: 'Combos',
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: false
  },
  {
    id: '10',
    name: "Solo Feast",
    description: "Any Classic Burger + One Milkshake of your choice.",
    price: 329,
    category: 'Combos',
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  },
  {
    id: '15',
    name: "Date Night Special",
    description: "2 Gourmet Burgers, 1 Large Fries to share, and 2 Red Velvet Shakes.",
    price: 799,
    category: 'Combos',
    image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
    isPopular: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Priya Sharma",
    role: "Foodie",
    content: "The Urban Legend Burger is hands down the best burger I've had in Bangalore! Super juicy and fresh.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: '2',
    name: "Rahul Verma",
    role: "Student",
    content: "Great place for a quick bite with friends. Affordable prices and the peri-peri fries are addictive!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: '3',
    name: "Sneha Kapoor",
    role: "Corporate Professional",
    content: "Lunch breaks are a joy now. The service is incredibly fast, and the wraps are healthy and delicious.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: '4',
    name: "Arjun Mehta",
    role: "Local Guide",
    content: "The Family Combo is a total steal! Best value for money in the city. Highly recommended for weekend treats.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: "The Secret Behind Our Buns",
    excerpt: "Why we bake fresh every morning to ensure the perfect bite.",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    content: "Full content here..."
  },
  {
    id: '2',
    title: "5 New Combos for Students",
    excerpt: "Check out our budget-friendly meals designed for college breaks.",
    date: "Nov 01, 2023",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80",
    content: "Full content here..."
  },
  {
    id: '3',
    title: "The Art of the Perfect Fry",
    excerpt: "Crispy, golden, and seasoned to perfection. Discover the secret behind our signature fries.",
    date: "Dec 15, 2023",
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?q=80&w=800&auto=format&fit=crop",
    content: "Full content here..."
  }
];
