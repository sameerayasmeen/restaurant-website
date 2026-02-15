import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ChefHat, Heart, Award, Users, Coffee, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Header */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block animate-in slide-in-from-bottom duration-700 delay-100">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight animate-in slide-in-from-bottom duration-700 delay-200">
            More Than Just <br/> <span className="text-orange-500">Fast Food.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom duration-700 delay-300">
            We started with a simple mission: to serve street food that tastes like gourmet, without the gourmet price tag.
          </p>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full blur-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Chefs cooking" 
                  className="rounded-[2.5rem] shadow-2xl border-8 border-gray-50 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100 hidden md:block">
                  <p className="text-gray-900 font-bold text-lg mb-1">"Best Burger 2023"</p>
                  <p className="text-orange-500 text-sm font-medium">City Food Awards</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">It All Started in a <br/><span className="text-orange-600">Tiny Kitchen.</span></h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Back in 2018, three friends realized that "fast food" had lost its soul. It was either cheap and greasy, or expensive and slow. There was no middle ground.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Urban Bites was born out of a garage on MG Road. We spent months perfecting our secret sauce, baking our own buns, and sourcing locally grown potatoes for the perfect fries. Today, we're a family of 20+ passionate foodies serving thousands of happy customers every month.
              </p>
              <div className="flex gap-8">
                <div>
                  <h4 className="text-3xl font-extrabold text-gray-900">50k+</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Happy Eaters</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-gray-900">5+</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Years Cooking</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-gray-900">120</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Menu Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-extrabold tracking-widest uppercase text-xs mb-2 block">Our Philosophy</span>
            <h2 className="text-4xl font-extrabold text-gray-900">Why We Are Different</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Made with Love</h3>
              <p className="text-gray-500 leading-relaxed">
                We don't use frozen patties. Every burger is hand-smashed, every veggie is chopped fresh every morning. You can taste the care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-500 leading-relaxed">
                We are more than a business; we are a hangout spot. We support local artists, students, and events in Bangalore.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Uncompromised Quality</h3>
              <p className="text-gray-500 leading-relaxed">
                If it's not good enough for our family, it's not good enough for you. We maintain strict hygiene and quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Snippet */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 relative text-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-gray-900">
                <ChefHat size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">Meet The Makers</h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                "Food is the ingredient that binds us together. We don't just serve customers; we serve friends."
              </p>
              <div className="flex justify-center items-center gap-4">
                 <Link to="/contact">
                    <Button variant="primary" size="lg" className="rounded-full px-8">Join Our Team</Button>
                 </Link>
                 <Link to="/menu">
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-white border-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-500">View Menu</Button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;