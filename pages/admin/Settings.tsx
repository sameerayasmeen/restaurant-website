import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const { businessInfo, updateBusinessInfo, resetAllData } = useStore();
  const [formData, setFormData] = useState(businessInfo);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      socials: { ...formData.socials, [e.target.name]: e.target.value } 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Update your business details and contact info.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">General Info</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Contact & Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
              <input type="text" name="openingHours" value={formData.openingHours} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Social Links</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input type="text" name="instagram" value={formData.socials.instagram} onChange={handleSocialChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input type="text" name="facebook" value={formData.socials.facebook} onChange={handleSocialChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
              <input type="text" name="twitter" value={formData.socials.twitter} onChange={handleSocialChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button type="submit">Save Settings</Button>
            {saved && <span className="text-green-600 font-bold animate-pulse">Changes Saved!</span>}
          </div>
        </form>
      </div>

      {/* Restore/Danger Zone */}
      <div className="bg-red-50 rounded-xl border border-red-100 p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-600" size={24} />
          <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
        </div>
        <p className="text-red-700 text-sm mb-6 leading-relaxed">
          Need to start over? The restore option allows you to clear all local changes and revert back to the original Urban Bites factory configuration. This cannot be undone.
        </p>
        <Button 
          variant="danger" 
          onClick={resetAllData} 
          className="flex items-center gap-2 group"
        >
          <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
          Restore Factory Defaults
        </Button>
      </div>
    </div>
  );
};

export default Settings;