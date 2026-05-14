"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccessoriesCategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // MOCK DATA: Accessories Products (Expanded to 12 items with reliable URLs)
  const accessoriesProducts = [
    { id: 1, name: 'Classic Chronograph Watch', price: '₹5,999', category: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Polarized Aviator Sunglasses', price: '₹2,499', category: 'Eyewear', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Genuine Leather Belt', price: '₹1,499', category: 'Leather Goods', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Minimalist Gold Pendant', price: '₹3,999', category: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00ea?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Premium Canvas Tote Bag', price: '₹2,199', category: 'Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Wool Fedora Hat', price: '₹1,899', category: 'Headwear', image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=800&q=80' },
    { id: 7, name: 'Silk Patterned Scarf', price: '₹1,299', category: 'Scarves', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Woven Leather Wallet', price: '₹1,599', category: 'Leather Goods', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Silver Link Bracelet', price: '₹2,499', category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Leather Crossbody Bag', price: '₹4,599', category: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
    { id: 11, name: 'Retro Square Sunglasses', price: '₹1,899', category: 'Eyewear', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Minimalist Leather Watch', price: '₹4,299', category: 'Watches', image: 'https://images.unsplash.com/photo-1758887953059-ca6f8e454207?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1pbmltYWxpc3QlMjBMZWF0aGVyJTIwV2F0Y2h8ZW58MHx8MHx8fDA%3D' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. CATEGORY HERO BANNER */}
      <section className="relative w-full h-[40vh] bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80" 
          alt="Accessories Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 object-center"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            ACCESSORIES
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            The perfect finishing touches. Elevate your look with our premium selection.
          </p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Sidebar + Grid) - EXPANDED WIDTH TO 1400px */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="font-bold text-gray-900">{accessoriesProducts.length} Products</span>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
        </div>

        {/* Sidebar / Filters - FIXED WIDTH (w-64 / 256px) */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 space-y-8`}>
          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Categories</h3>
            <ul className="space-y-3">
              {['All', 'Watches', 'Jewelry', 'Bags & Wallets', 'Eyewear', 'Belts', 'Hats & Scarves'].map((item) => (
                <li key={item}>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                    <span className="ml-3 text-gray-600 group-hover:text-emerald-600 transition-colors">{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Price Range</h3>
            <ul className="space-y-3">
              {['Under ₹1,500', '₹1,500 - ₹3,000', '₹3,000 - ₹5,000', 'Over ₹5,000'].map((price) => (
                <li key={price}>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                    <span className="ml-3 text-gray-600 group-hover:text-emerald-600 transition-colors">{price}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid Area - FLEX-1 TO FILL REMAINING SPACE */}
        <main className="flex-1">
          
          {/* Top Bar (Desktop) */}
          <div className="hidden lg:flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <span className="text-gray-500">Showing all {accessoriesProducts.length} results</span>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-gray-600 font-medium">Sort by:</label>
              <select id="sort" className="border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 focus:ring-emerald-500 focus:border-emerald-500 outline-none border cursor-pointer">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Sellers</option>
              </select>
            </div>
          </div>

          {/* Grid - 4 COLUMNS ON XL SCREENS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {accessoriesProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-gray-800 rounded-full">
                    {product.category}
                  </div>
                  {/* Quick Add Button */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded shadow-lg hover:bg-emerald-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                {/* Product Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base text-gray-900 font-semibold group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  </div>
                  <p className="text-lg font-black text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 cursor-not-allowed" disabled>Previous</button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Next</button>
            </nav>
          </div>

        </main>
      </div>
    </div>
  );
}