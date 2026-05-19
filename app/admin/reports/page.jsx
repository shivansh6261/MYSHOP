"use client";

import React from 'react';

export default function ReportsPage() {
  // Mock monthly revenue data
  const monthlyData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 59000 }, // Current month
    { month: 'Jun', revenue: 0 },
  ];

  // Find max revenue to calculate chart heights
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Track your business growth and sales performance.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Revenue (YTD)</p>
          <p className="text-3xl font-black text-gray-900">₹2,65,000</p>
          <p className="text-sm text-emerald-600 font-medium mt-2">↑ 12% from last year</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Orders (YTD)</p>
          <p className="text-3xl font-black text-gray-900">1,204</p>
          <p className="text-sm text-blue-600 font-medium mt-2">↑ 8% from last year</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Average Order Value</p>
          <p className="text-3xl font-black text-gray-900">₹220</p>
          <p className="text-sm text-gray-500 font-medium mt-2">Steady</p>
        </div>
      </div>

      {/* Revenue Chart (Built with pure Tailwind CSS!) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview (2026)</h2>
        
        <div className="h-64 flex items-end justify-between gap-2 border-b border-gray-200 pb-4 relative">
          {/* Y-Axis lines (Decorative) */}
          <div className="absolute w-full border-t border-gray-100 border-dashed bottom-1/2"></div>
          <div className="absolute w-full border-t border-gray-100 border-dashed top-0"></div>

          {monthlyData.map((data) => {
            const heightPercentage = data.revenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
            return (
              <div key={data.month} className="flex flex-col items-center flex-1 group z-10">
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition text-xs font-bold text-gray-600 mb-2">
                  ₹{data.revenue.toLocaleString()}
                </span>
                
                {/* The Bar */}
                <div 
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${data.revenue === 0 ? 'bg-gray-100' : 'bg-emerald-500 hover:bg-emerald-400'}`}
                  style={{ height: `${heightPercentage}%`, minHeight: data.revenue === 0 ? '4px' : '0' }}
                ></div>
                
                {/* X-Axis Label */}
                <span className="text-sm font-medium text-gray-500 mt-4">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}