import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { CheckCircle, Calendar, Users, Loader2 } from 'lucide-react';
import { Reservation as ReservationType } from '../types';

const Reservation: React.FC = () => {
  const { addReservation } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newReservation: ReservationType = {
      id: Date.now().toString(),
      ...formData,
      guests: parseInt(formData.guests),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    addReservation(newReservation);

    try {
      const response = await fetch("https://formspree.io/f/mlgwbegq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `New Reservation Request from ${formData.name}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 animate-in fade-in zoom-in duration-300">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center max-w-lg w-full border border-gray-100">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Request Sent!</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            We have received your reservation request for <span className="font-bold text-gray-900">{formData.guests} people</span> on {formData.date}. We will contact you shortly to confirm.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full">Make Another Reservation</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          
          {/* Info Panel */}
          <div className="md:w-5/12 bg-gray-900 p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
                <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Reservations</span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Secure Your <br/>Spot.</h1>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                      <div className="p-3 bg-gray-800 rounded-xl text-orange-500 shadow-lg"><Calendar size={24} /></div>
                      <div>
                        <h3 className="font-bold text-white text-lg">Everyday</h3>
                        <p className="text-gray-500 text-sm">11:00 AM - 11:00 PM</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-6">
                      <div className="p-3 bg-gray-800 rounded-xl text-orange-500 shadow-lg"><Users size={24} /></div>
                      <div>
                        <h3 className="font-bold text-white text-lg">Group Dining</h3>
                        <p className="text-gray-500 text-sm">Special arrangements for 10+</p>
                      </div>
                  </div>
                </div>
            </div>
            <div className="mt-12 relative z-10 pt-8 border-t border-gray-800">
                <p className="text-xs text-gray-500 font-medium">Questions? Call us</p>
                <p className="text-xl font-bold text-white mt-1">+91 98765 43210</p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="md:w-7/12 p-10 md:p-16 bg-white">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Enter Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Full Name</label>
                  <input required type="text" name="name" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="John Doe" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                  <input required type="tel" name="phone" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="+91..." onChange={handleChange} disabled={isSubmitting} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input required type="email" name="email" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="john@example.com" onChange={handleChange} disabled={isSubmitting} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Date</label>
                  <input required type="date" name="date" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Time</label>
                  <input required type="time" name="time" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Guests</label>
                  <select name="guests" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" onChange={handleChange} disabled={isSubmitting}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} People</option>)}
                    <option value="11">10+ (Special Request)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Special Requests</label>
                <textarea name="notes" rows={3} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="Birthdays, allergies, or specific table preference..." onChange={handleChange} disabled={isSubmitting}></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full py-5 rounded-xl text-lg flex items-center justify-center gap-2" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Request Reservation"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;