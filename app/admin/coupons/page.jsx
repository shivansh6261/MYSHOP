"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function CouponsPage() {
  const [isAdding, setIsAdding] = useState(false);
  
  // Dummy data representing your active coupons
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME10', type: 'percentage', value: 10, expiry: '2026-12-31', limit: 100, used: 45, status: 'Active' },
    { id: 2, code: 'FESTIVE500', type: 'fixed', value: 500, expiry: '2026-10-15', limit: 50, used: 50, status: 'Expired' }
  ]);

  const [newCoupon, setNewCoupon] = useState({ code: '', type: 'percentage', value: '', expiry: '', limit: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    const couponObj = {
      id: Math.random(),
      code: newCoupon.code.toUpperCase(),
      type: newCoupon.type,
      value: Number(newCoupon.value),
      expiry: newCoupon.expiry,
      limit: Number(newCoupon.limit),
      used: 0,
      status: 'Active'
    };
    
    setCoupons([couponObj, ...coupons]);
    setNewCoupon({ code: '', type: 'percentage', value: '', expiry: '', limit: '' });
    setIsAdding(false);
    toast.success('Coupon created successfully!');
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
    toast.success('Coupon deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons & Discounts</h1>
          <p className="text-gray-500 mt-1">Create promo codes to boost your sales.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700">
          {isAdding ? 'Cancel' : '+ Create Coupon'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
              <input type="text" required placeholder="e.g. SUMMER20" value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})} className="w-full px-3 py-2 border rounded-lg uppercase" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
              <select value={newCoupon.type} onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="percentage">% Percentage</option>
                <option value="fixed">₹ Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
              <input type="number" required value={newCoupon.value} onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input type="date" required value={newCoupon.expiry} onChange={(e) => setNewCoupon({...newCoupon, expiry: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 h-[42px]">
              Save
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Code</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Usage</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Expiry</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className={coupon.status === 'Expired' ? 'bg-gray-50 opacity-60' : ''}>
                <td className="px-6 py-4 font-black text-gray-900 tracking-wider">{coupon.code}</td>
                <td className="px-6 py-4 font-medium text-emerald-600">
                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{coupon.used} / {coupon.limit} used</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(coupon.expiry).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}