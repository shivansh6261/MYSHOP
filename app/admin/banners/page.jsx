"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function BannersPage() {
  const [headline, setHeadline] = useState('Festive Collection is Live');
  const [subheadline, setSubheadline] = useState('Get up to 50% off on all traditional wear.');
  const [buttonText, setButtonText] = useState('Shop Now');

  const handleSave = () => {
    // In a real app, you would save this to Supabase
    toast.success('Homepage banner updated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Homepage Banner</h1>
        <p className="text-gray-500 mt-1">Change the main text that customers see when they visit your site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="text-lg font-bold mb-4">Edit Content</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Headline</label>
            <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-lg font-bold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-headline (Description)</label>
            <textarea value={subheadline} onChange={(e) => setSubheadline(e.target.value)} rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <button onClick={handleSave} className="w-full mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
            Publish to Homepage
          </button>
        </div>

        {/* Live Preview */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-700">Live Preview</h3>
          <div className="bg-gray-900 rounded-2xl h-[400px] flex items-center justify-center p-8 text-center relative overflow-hidden shadow-lg border-4 border-gray-200">
            {/* Dark overlay to simulate image background */}
            <div className="absolute inset-0 bg-black/40"></div> 
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-4xl font-black text-white leading-tight">
                {headline || 'Your Headline Here'}
              </h2>
              <p className="text-lg text-gray-200">
                {subheadline || 'Your sub-headline description goes here.'}
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg mt-4 pointer-events-none">
                {buttonText || 'Click Here'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}