"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function KidsCategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // MOCK DATA: Kids & Baby Products
  const kidsProducts = [
    { id: 1, name: 'Cotton Striped Onesie', price: '₹999', category: 'Infants', image: 'https://images.unsplash.com/photo-1522771930-78848d92871d?w=500&q=80' },
    { id: 2, name: 'Girls Floral Sundress', price: '₹1,499', category: 'Girls', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a5dc6a8?w=500&q=80' },
    { id: 3, name: 'Boys Graphic T-Shirt', price: '₹799', category: 'Boys', image: 'https://images.unsplash.com/photo-1514090259040-c6d9c4f1c9c4?w=500&q=80' },
    { id: 4, name: 'Toddler Denim Overalls', price: '₹1,799', category: 'Unisex', image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&q=80' },
    { id: 5, name: 'Winter Puffer Jacket', price: '₹2,499', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1503945438517-f65904a52ce6?w=500&q=80' },
    { id: 6, name: 'Knit Cardigan Sweater', price: '₹1,299', category: 'Girls', image: 'https://images.unsplash.com/photo-1604467715878-154a37b34e5f?w=500&q=80' },
    { id: 7, name: 'Boys Chino Shorts', price: '₹1,099', category: 'Boys', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80' },
    { id: 8, name: 'Colorful Play Sneakers', price: '₹1,999', category: 'Shoes', image: 'https://images.unsplash.com/photo-1515347619362-e6114ebbd68e?w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. CATEGORY HERO BANNER */}
      <section className="relative w-full h-[40vh] bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=1920&q=80" 
          alt="Kids & Baby Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 object-center"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            KIDS & BABY
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            Playful patterns, durable fabrics, and everyday comfort for the little ones.
          </p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Sidebar + Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="font-bold text-gray-900">{kidsProducts.length} Products</span>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
        </div>

        {/* Sidebar / Filters */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 flex-shrink-0 space-y-8`}>
          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Categories</h3>
            <ul className="space-y-3">
              {['All', 'Boys', 'Girls', 'Infants & Toddlers', 'Outerwear', 'Shoes & Accessories'].map((item) => (
                <li key={item}>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                    <span className="ml-3 text-gray-600 group-hover:text-emerald-600 transition-colors">{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Age/Size Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Age Group</h3>
            <ul className="space-y-3">
              {['0 - 24 Months', '2 - 5 Years', '6 - 10 Years', '11 - 14 Years'].map((size) => (
                <li key={size}>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                    <span className="ml-3 text-gray-600 group-hover:text-emerald-600 transition-colors">{size}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Price Range</h3>
            <ul className="space-y-3">
              {['Under ₹1,000', '₹1,000 - ₹2,000', '₹2,000 - ₹4,000', 'Over ₹4,000'].map((price) => (
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

        {/* Product Grid Area */}
        <main className="w-full lg:w-3/4">
          
          {/* Top Bar (Desktop) */}
          <div className="hidden lg:flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <span className="text-gray-500">Showing all {kidsProducts.length} results</span>
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {kidsProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-4">
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
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Next</button>
            </nav>
          </div>

        </main>
      </div>
    </div>
  );
}