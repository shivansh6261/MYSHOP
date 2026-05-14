"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
export default function KidsCategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
 const { addToCart } = useCart();
  // MOCK DATA: Kids & Baby Products (Expanded to 12 items)
const kidsProducts = [
    { id: 'k1', name: 'Cotton Striped Onesie', price: '₹999', category: 'Infants', image: 'https://media.istockphoto.com/id/2226265303/photo/curious-baby-boy-smiling-while-playing-on-the-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=XRLLsxQb3GKABbqaIzsWgksH8rcGQV5RPx4msI_gDFw=' },
    { id: 'k2', name: 'Girls Floral Sundress', price: '₹1,499', category: 'Girls', image: 'https://plus.unsplash.com/premium_photo-1677180777140-895e6bdda25e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEdpcmxzJTIwRmxvcmFsJTIwU3VuZHJlc3N8ZW58MHx8MHx8fDA%3D' },
    { id: 'k3', name: 'Boys Graphic T-Shirt', price: '₹799', category: 'Boys', image: 'https://images.unsplash.com/photo-1630827223608-dcd7f69871be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJveXMlMjBHcmFwaGljJTIwVC1TaGlydHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'k4', name: 'Toddler Denim Overalls', price: '₹1,799', category: 'Unisex', image: 'https://images.unsplash.com/photo-1698939096910-5b9a8fec3425?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFRvZGRsZXIlMjBEZW5pbSUyME92ZXJhbGxzfGVufDB8fDB8fHww' },
    { id: 'k5', name: 'Winter Puffer Jacket', price: '₹2,499', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1503945438517-f65904a52ce6?auto=format&fit=crop&w=800&q=80' },
    { id: 'k6', name: 'Knit Cardigan Sweater', price: '₹1,299', category: 'Girls', image: 'https://plus.unsplash.com/premium_photo-1671460921793-e5e99d795819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S25pdCUyMENhcmRpZ2FuJTIwU3dlYXRlcnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'k7', name: 'Boys Chino Shorts', price: '₹1,099', category: 'Boys', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80' },
    { id: 'k8', name: 'Colorful Play Sneakers', price: '₹1,999', category: 'Shoes', image: 'https://images.unsplash.com/photo-1694026091737-10fdadf460ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q29sb3JmdWwlMjBQbGF5JTIwU25lYWtlcnN8ZW58MHx8MHx8fDA%3D' },
    { id: 'k9', name: 'Baby Knit Beanie', price: '₹499', category: 'Accessories', image: 'https://plus.unsplash.com/premium_photo-1681152385632-036d0fa367ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJhYnklMjBLbml0JTIwQmVhbmllfGVufDB8fDB8fHww' },
    { id: 'k10', name: 'Toddler Rain Boots', price: '₹1,299', category: 'Shoes', image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80' },
    { id: 'k11', name: 'Girls Ruffle Top', price: '₹899', category: 'Girls', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80' },
    { id: 'k12', name: 'Boys Fleece Sweatpants', price: '₹1,199', category: 'Boys', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=800&q=80' },
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

      {/* 2. MAIN LAYOUT (Sidebar + Grid) - EXPANDED WIDTH TO 1400px */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        
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

        {/* Sidebar / Filters - FIXED WIDTH (w-64 / 256px) */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 space-y-8`}>
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

        {/* Product Grid Area - FLEX-1 TO FILL REMAINING SPACE */}
        <main className="flex-1">
          
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

          {/* Grid - 4 COLUMNS ON XL SCREENS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {kidsProducts.map((product) => (
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
                     <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents link clicks if wrapped in an <a> tag
                        addToCart(product); // Adds this specific product to the cart!
                      }}
                      className="w-full bg-emerald-600 text-white font-bold py-3 rounded shadow-lg hover:bg-emerald-700 transition-colors"
                    >
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