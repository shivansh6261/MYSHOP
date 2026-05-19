"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: '',
    contactEmail: '',
    supportPhone: '',
    whatsappNumber: '',
    gstNumber: '',
    storeAddress: ''
  });

  // Load saved settings when page loads
  useEffect(() => {
    const saved = localStorage.getItem('storeSettings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate a brief network delay, then save to LocalStorage
    setTimeout(() => {
      localStorage.setItem('storeSettings', JSON.stringify(settings));
      toast.success('Store settings updated!');
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your business information and contact details.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8">
        <form onSubmit={handleSave} className="space-y-6">
          
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} placeholder="e.g., My Awesome Shop" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number (Optional)</label>
              <input type="text" name="gstNumber" value={settings.gstNumber} onChange={handleChange} placeholder="22AAAAA0000A1Z5" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 border-b pb-2 pt-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Care Phone</label>
              <input type="tel" name="supportPhone" value={settings.supportPhone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Business Number</label>
              <input type="tel" name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 border-b pb-2 pt-4">Business Address</h3>
          <div>
            <textarea name="storeAddress" value={settings.storeAddress} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Full store address for invoices..."></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSaving} className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}