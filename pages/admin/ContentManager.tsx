
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { LayoutTemplate, Type, Image as ImageIcon, ToggleLeft, Save } from 'lucide-react';

const ContentManager: React.FC = () => {
  const { homepageConfig, updateHomepageConfig } = useStore();
  const [formData, setFormData] = useState(homepageConfig);
  const [saved, setSaved] = useState(false);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ 
      ...formData, 
      hero: { ...formData.hero, [e.target.name]: e.target.value } 
    });
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ 
      ...formData, 
      promo: { ...formData.promo, [e.target.name]: e.target.value } 
    });
  };

  const toggleSection = (section: keyof typeof formData.sections) => {
    setFormData({
      ...formData,
      sections: { ...formData.sections, [section]: !formData.sections[section] }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Content</h1>
          <p className="text-gray-500">Customize the look and text of your landing page.</p>
        </div>
        {saved && <span className="text-green-600 font-medium animate-pulse mb-1">Changes Saved!</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <LayoutTemplate className="text-orange-500" size={20} />
            <h3 className="font-bold text-gray-900">Hero Section</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Badge Text</label>
                <input type="text" name="badge" value={formData.hero.badge} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
               </div>
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Headline (Supports HTML)</label>
                <textarea name="headline" value={formData.hero.headline} onChange={handleHeroChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm font-mono" />
                <p className="text-xs text-gray-400 mt-1">Use &lt;br/&gt; for line breaks, &lt;span&gt; for styling.</p>
               </div>
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subheadline</label>
                <textarea name="subheadline" value={formData.hero.subheadline} onChange={handleHeroChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
               </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hero Image URL</label>
              <input type="text" name="image" value={formData.hero.image} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm mb-4" />
              <div className="relative rounded-xl overflow-hidden h-48 bg-gray-100 border border-gray-200">
                <img src={formData.hero.image} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Preview</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <ToggleLeft className="text-blue-500" size={20} />
            <h3 className="font-bold text-gray-900">Section Visibility</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(formData.sections).map(([key, value]) => (
              <label key={key} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="checkbox" className="hidden" checked={value} onChange={() => toggleSection(key as any)} />
                <span className={`font-bold capitalize ${value ? 'text-green-700' : 'text-gray-500'}`}>{key}</span>
                <span className={`text-xs mt-1 ${value ? 'text-green-600' : 'text-gray-400'}`}>{value ? 'Visible' : 'Hidden'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Promo Section Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <Type className="text-purple-500" size={20} />
            <h3 className="font-bold text-gray-900">Promo Section Text</h3>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Promo Title (HTML)</label>
                <input type="text" name="title" value={formData.promo.title} onChange={handlePromoChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm font-mono" />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subtitle</label>
                <input type="text" name="subtitle" value={formData.promo.subtitle} onChange={handlePromoChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
             </div>
             <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea name="description" value={formData.promo.description} onChange={handlePromoChange} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
             </div>
           </div>
        </div>

        <div className="flex justify-end pt-4">
           <Button type="submit" size="lg" className="flex items-center gap-2 shadow-xl">
             <Save size={18} /> Save All Changes
           </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentManager;
