
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { Save, Store, LayoutTemplate, ToggleLeft, Type, Image as ImageIcon } from 'lucide-react';

const SiteConfig: React.FC = () => {
  const { businessInfo, updateBusinessInfo, homepageConfig, updateHomepageConfig } = useStore();
  const [activeTab, setActiveTab] = useState<'general' | 'homepage'>('general');
  const [saved, setSaved] = useState(false);

  // Local state for forms
  const [generalData, setGeneralData] = useState(businessInfo);
  const [homeData, setHomeData] = useState(homepageConfig);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralData({ ...generalData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralData({ 
      ...generalData, 
      socials: { ...generalData.socials, [e.target.name]: e.target.value } 
    });
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHomeData({ 
      ...homeData, 
      hero: { ...homeData.hero, [e.target.name]: e.target.value } 
    });
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHomeData({ 
      ...homeData, 
      promo: { ...homeData.promo, [e.target.name]: e.target.value } 
    });
  };

  const toggleSection = (section: keyof typeof homeData.sections) => {
    setHomeData({
      ...homeData,
      sections: { ...homeData.sections, [section]: !homeData.sections[section] }
    });
  };

  const saveAll = () => {
    updateBusinessInfo(generalData);
    updateHomepageConfig(homeData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Configuration</h1>
          <p className="text-gray-500">Manage business details and homepage content.</p>
        </div>
        <Button onClick={saveAll} className="flex items-center gap-2 shadow-xl">
           <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'general' ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Store size={18} /> Business Info
          </button>
          <button 
            onClick={() => setActiveTab('homepage')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'homepage' ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-500' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutTemplate size={18} /> Homepage
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Business Name</label>
                  <input type="text" name="name" value={generalData.name} onChange={handleGeneralChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tagline</label>
                  <input type="text" name="tagline" value={generalData.tagline} onChange={handleGeneralChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                  <input type="text" name="address" value={generalData.address} onChange={handleGeneralChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                  <input type="text" name="phone" value={generalData.phone} onChange={handleGeneralChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input type="email" name="email" value={generalData.email} onChange={handleGeneralChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                 <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Instagram URL</label>
                  <input type="text" name="instagram" value={generalData.socials.instagram} onChange={handleSocialChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
                 <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Facebook URL</label>
                  <input type="text" name="facebook" value={generalData.socials.facebook} onChange={handleSocialChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               {/* Hero */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><LayoutTemplate size={18} className="text-orange-500"/> Hero Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Badge</label>
                            <input type="text" name="badge" value={homeData.hero.badge} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Headline (HTML)</label>
                            <textarea name="headline" value={homeData.hero.headline} onChange={handleHeroChange} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm font-mono bg-white text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subheadline</label>
                            <textarea name="subheadline" value={homeData.hero.subheadline} onChange={handleHeroChange} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hero Image URL</label>
                        <input type="text" name="image" value={homeData.hero.image} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm mb-2 bg-white text-gray-900" />
                        <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                           <img src={homeData.hero.image} alt="Hero Preview" className="w-full h-full object-cover" />
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Sections */}
               <div className="border-t border-gray-100 pt-6">
                   <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ToggleLeft size={18} className="text-blue-500"/> Section Visibility</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {Object.entries(homeData.sections).map(([key, value]) => (
                        <label key={key} className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${value ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
                            <input type="checkbox" className="hidden" checked={value} onChange={() => toggleSection(key as any)} />
                            <span className="text-sm font-bold capitalize text-gray-900">{key}</span>
                        </label>
                      ))}
                   </div>
               </div>

               {/* Promo */}
               <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Type size={18} className="text-purple-500"/> Promo Banner</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (HTML)</label>
                        <input type="text" name="title" value={homeData.promo.title} onChange={handlePromoChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm font-mono bg-white text-gray-900" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subtitle</label>
                        <input type="text" name="subtitle" value={homeData.promo.subtitle} onChange={handlePromoChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white text-gray-900" />
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteConfig;
