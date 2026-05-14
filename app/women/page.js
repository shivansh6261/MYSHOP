"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function WomenCategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // MOCK DATA: Women's Products (Expanded to 12 items)
  const womensProducts = [
    { id: 1, name: 'Floral Summer Dress', price: '₹2,999', category: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Premium Silk Blouse', price: '₹1,899', category: 'Tops', image: 'https://images.unsplash.com/photo-1588117260148-b47818741c74?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'High-Waisted Trousers', price: '₹2,499', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Tailored Wool Blazer', price: '₹4,599', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Pleated Midi Skirt', price: '₹1,999', category: 'Bottoms', image: 'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhc2hpb258ZW58MHx8MHx8fDA%3D' },
    { id: 6, name: 'Chunky Knit Sweater', price: '₹2,199', category: 'Tops', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80' },
    { id: 7, name: 'Elegant Evening Gown', price: '₹8,999', category: 'Dresses', image: 'https://images.unsplash.com/photo-1559034750-cdab70a66b8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWxlZ2FudCUyMEV2ZW5pbmclMjBHb3dufGVufDB8fDB8fHww' },
    { id: 8, name: 'Classic Denim Jacket', price: '₹3,499', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Cashmere Turtleneck', price: '₹3,299', category: 'Tops', image: 'https://media.istockphoto.com/id/108129042/photo/young-woman-wearing-cashmere-sweater.jpg?s=612x612&w=0&k=20&c=3uxKoRTcG-fGhCLImPZXiGA51z_njHmBricUqbmW7HA=' },
    { id: 10, name: 'Wide-Leg Linen Pants', price: '₹2,799', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80' },
    { id: 11, name: 'Satin Slip Dress', price: '₹3,599', category: 'Dresses', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Double-Breasted Trench Coat', price: '₹6,999', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1742672725140-59b8e7402958?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERvdWJsZS1CcmVhc3RlZCUyMFRyZW5jaCUyMENvYXR8ZW58MHx8MHx8fDA%3D' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* 1. CATEGORY HERO BANNER */}
      <section className="relative w-full h-[40vh] bg-gray-900 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&q=80"
          alt="Women's Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-50 object-top"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            WOMEN'S COLLECTION
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            Effortless elegance, contemporary silhouettes, and everyday luxury.
          </p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Sidebar + Grid) - EXPANDED WIDTH */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="font-bold text-gray-900">{womensProducts.length} Products</span>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
        </div>

        {/* Sidebar / Filters - FIXED WIDTH (w-64) */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 space-y-8`}>
          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Categories</h3>
            <ul className="space-y-3">
              {['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'].map((item) => (
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
              {['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', 'Over ₹10,000'].map((price) => (
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
            <span className="text-gray-500">Showing all {womensProducts.length} results</span>
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
            {womensProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
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