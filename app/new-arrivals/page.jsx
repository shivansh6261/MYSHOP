"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/superbase';
import { useCart } from '../../context/CartContext'; // 👈 Import your existing Cart Context
import toast from 'react-hot-toast';

export default function NewArrivalsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart(); // 👈 Pull the addToCart function from context

  useEffect(() => {
    const fetchNewArrivals = async () => {
      // Direct connection to our smart database filter
      const { data, error } = await supabase
        .from('new_arrivals') 
        .select('*');

      if (error) {
        console.error("Error loading new arrivals:", error.message);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchNewArrivals();
  }, []);

  const handleAddToCart = (product) => {
    // Construct the standard product object your cart context expects
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discount_price || product.price, // Uses discount price if available
      image: product.image_urls?.[0] || 'https://via.placeholder.com/300',
      quantity: 1
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">🔥 New Arrivals</h1>
        <p className="text-gray-500 mt-2">The latest trends dropped directly into our warehouse this week.</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-gray-50 border border-dashed rounded-2xl p-12 text-center text-gray-500">
          No new arrivals this week. Check back soon for the next drop!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group flex flex-col justify-between hover:shadow-md transition duration-300">
              
              {/* Top Section: Image & Tags */}
              <div>
                <div className="h-72 bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image_urls?.[0] || 'https://via.placeholder.com/300'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={product.name}
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    New
                  </span>
                  {product.discount_price && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md shadow-sm">
                      SAVE ₹{product.price - product.discount_price}
                    </span>
                  )}
                </div>

                {/* Middle Section: Details */}
                <div className="p-4 space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.brand || 'Generic'}</p>
                  <h3 className="text-sm font-bold text-gray-900 truncate">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-lg font-black text-gray-900">₹{product.discount_price || product.price}</span>
                    {product.discount_price && (
                      <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Add to Cart Action Button */}
              <div className="p-4 pt-0">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gray-900 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}