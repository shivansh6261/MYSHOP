"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/superbase'; // Ensure this path matches your setup

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    customers: 0
  });

  useEffect(() => {
    // In the future, you will fetch real counts from Supabase here!
    // Example: const { count } = await supabase.from('products').select('*', { count: 'exact' });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Here is what is happening in your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Today's Sales</p>
          <p className="text-4xl font-black text-emerald-600">₹0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Orders</p>
          <p className="text-4xl font-black text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Products in Stock</p>
          <p className="text-4xl font-black text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">New Customers</p>
          <p className="text-4xl font-black text-gray-900">0</p>
        </div>
      </div>

      {/* Two Column Layout for Pending Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Deliveries</h2>
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-500">
            No pending deliveries at the moment.
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Low Stock Alerts</h2>
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-500">
            All products are sufficiently stocked.
          </div>
        </div>
      </div>
    </div>
  );
}