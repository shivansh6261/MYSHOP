"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '👕' },
    { name: 'Categories', path: '/admin/categories', icon: '📁' },
    { name: 'Orders', path: '/admin/orders', icon: '📦' },
    { name: 'Customers', path: '/admin/customers', icon: '👥' },
    { name: 'Inventory', path: '/admin/inventory', icon: '📋' },
    { name: 'Coupons', path: '/admin/coupons', icon: '🎟️' },
    { name: 'Banners', path: '/admin/banners', icon: '🖼️' },
    { name: 'Reviews', path: '/admin/reviews', icon: '⭐' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  // Helper function to render links (avoids duplicating code for desktop & mobile sidebars)
  const renderNavLinks = (closeMenuOnClick = false) => {
    return menuItems.map((item) => {
      const isActive = pathname === item.path;
      return (
        <Link 
          key={item.name} 
          href={item.path}
          onClick={() => { if (closeMenuOnClick) setIsMobileMenuOpen(false); }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
            isActive 
              ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </Link>
      );
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      
      {/* 📱 1. MOBILE TOP NAVIGATION BAR (Only shows up on Phone/Mobile) */}
      <header className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-xl font-black text-gray-900">Store<span className="text-emerald-600">Admin</span></h2>
        
        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
         {isMobileMenuOpen ? (
  // Modern Close Cross (X) with smooth rounded lines
  <svg className="w-6 h-6 text-emerald-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
) : (
  // 🚀 Premium Dashboard Grid/App Layout Icon
  <svg className="w-6 h-6 text-gray-700 hover:text-emerald-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)}
        </button>
      </header>

      {/* 📱 2. MOBILE DRAWER SLIDE-OUT MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Dark Backdrop Overlay */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          {/* Mobile Menu Panel */}
          <div className="relative w-72 max-w-xs bg-white h-full flex flex-col p-6 shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <div className="mb-6">
              <h2 className="text-xl font-black text-gray-900">Navigation</h2>
            </div>
            
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {renderNavLinks(true)}
            </nav>

            <div className="pt-4 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition">
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🖥️ 3. DESKTOP SIDEBAR (Hidden on phone, displays on laptop) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-gray-900">Store<span className="text-emerald-600">Admin</span></h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {renderNavLinks(false)}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* 🛠️ 4. MAIN WORKING SPACE CONTAINER */}
      <main className="flex-1 min-w-0">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}