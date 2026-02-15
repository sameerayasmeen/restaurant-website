import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, Send, CheckCircle, ArrowRight, MessageSquare, User, AtSign, FileText, PenTool, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Contact: React.FC = () => {
  const { businessInfo } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mlgwbegq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact Message: ${formData.subject || 'Inquiry'}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a problem sending your message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen">
      
      {/* Hero Header */}
      <div className="relative bg-gray-900 text-white pt-32 pb-48 overflow-hidden">
         {/* Background Image & Overlay */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000')] bg-cover bg-center opacity-40"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/90"></div>

         {/* Abstract Shapes */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 mix-blend-screen"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20 mix-blend-screen"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8 animate-in slide-in-from-bottom duration-500 hover:bg-white/20 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-sm font-medium tracking-wide">We are always open for you</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight animate-in slide-in-from-bottom duration-700 delay-100 drop-shadow-2xl">
               Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Conversation.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200 drop-shadow-md">
               Whether it's a reservation request, feedback on our famous burger, or just saying hello — we are all ears.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-4 space-y-6">
                {/* Address Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:transform hover:-translate-y-1 transition-all duration-300 group">
                   <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                      <MapPin size={28} className="text-orange-600 group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Visit HQ</h3>
                   <p className="text-gray-500 leading-relaxed mb-6">{businessInfo.address}</p>
                   <a href="#" className="inline-flex items-center text-orange-600 font-bold text-sm hover:gap-2 transition-all">
                      Get Directions <ArrowRight size={16} className="ml-1"/>
                   </a>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:transform hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                            <Phone size={28} className="text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-500 text-sm mb-4">Mon-Fri • 9am - 11pm</p>
                        <a href={`tel:${businessInfo.phone}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">{businessInfo.phone}</a>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:transform hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                            <Mail size={28} className="text-purple-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-500 text-sm mb-4">We reply within 24hrs</p>
                        <a href={`mailto:${businessInfo.email}`} className="text-lg font-bold text-gray-900 hover:text-purple-600 transition-colors break-words">{businessInfo.email}</a>
                    </div>
                </div>
            </div>

            {/* Right Column: Form & Map */}
            <div className="lg:col-span-8 space-y-8">
               
               {/* Form */}
               <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                  {/* Decorative blob inside form */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -ml-10 -mb-10 -z-10"></div>

                  {submitted ? (
                     <div className="text-center py-20 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-green-50">
                           <CheckCircle size={48} />
                        </div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Message Sent!</h3>
                        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">Thank you for reaching out. We have received your message and will get back to you shortly.</p>
                        <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-8">Send Another Message</Button>
                     </div>
                  ) : (
                     <>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 bg-gray-900 rounded-2xl text-white shadow-xl shadow-gray-900/20">
                                <MessageSquare size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 leading-none tracking-tight">Send a Message</h2>
                                <p className="text-gray-500 text-sm font-medium mt-1">We typically reply within minutes.</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3 group">
                                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-orange-600 transition-colors">Your Name</label>
                                 <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input 
                                        required 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        disabled={isSubmitting}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 font-medium text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300 disabled:opacity-50" 
                                        placeholder="John Doe" 
                                    />
                                 </div>
                              </div>
                              <div className="space-y-3 group">
                                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-orange-600 transition-colors">Email Address</label>
                                 <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                     <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                        <AtSign size={20} />
                                    </div>
                                    <input 
                                        required 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        disabled={isSubmitting}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 font-medium text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300 disabled:opacity-50" 
                                        placeholder="john@example.com" 
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="space-y-3 group">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-orange-600 transition-colors">Subject</label>
                              <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                    <FileText size={20} />
                                </div>
                                <select 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange as any} 
                                    disabled={isSubmitting}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 font-medium text-gray-900 appearance-none cursor-pointer shadow-sm hover:border-gray-300 disabled:opacity-50"
                                >
                                    <option value="">Select a topic</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Feedback">Feedback on Food/Service</option>
                                    <option value="Catering">Catering Request</option>
                                    <option value="Jobs">Job Application</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                              </div>
                           </div>
                           <div className="space-y-3 group">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-orange-600 transition-colors">Message</label>
                              <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <div className="absolute top-4 left-5 pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                    <PenTool size={20} />
                                </div>
                                <textarea 
                                    required 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    disabled={isSubmitting}
                                    rows={5} 
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 font-medium text-gray-900 placeholder-gray-400 resize-none shadow-sm hover:border-gray-300 disabled:opacity-50" 
                                    placeholder="Tell us how we can help..."
                                ></textarea>
                              </div>
                           </div>
                           <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    disabled={isSubmitting}
                                    className="w-full text-lg px-8 py-5 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95 transition-all bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>Sending <Loader2 size={22} className="ml-1 animate-spin" /></>
                                    ) : (
                                        <>Send Message <Send size={22} className="ml-1" /></>
                                    )}
                                </Button>
                           </div>
                        </form>
                     </>
                  )}
               </div>

               {/* Map Placeholder */}
               <div className="bg-gray-900 rounded-[2.5rem] h-80 w-full overflow-hidden relative shadow-2xl group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center justify-between hover:bg-white/15 transition-colors cursor-pointer">
                        <div>
                            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Find Us</p>
                            <p className="text-xl font-bold text-white">City Center Plaza, MG Road</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg animate-bounce">
                             <MapPin size={24} />
                        </div>
                     </div>
                  </div>
               </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;