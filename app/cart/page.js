"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Helper function to convert price strings like "₹2,499" into actual numbers (2499) for math
  const parsePrice = (priceStr) => {
    return Number(priceStr.replace(/[^\d]/g, ''));
  };

  // Calculate Totals
  const subtotal = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 499; // Free shipping on orders over ₹5,000
  const orderTotal = subtotal + shipping;

  // FORMATTER: Converts number back to Indian Rupee format (e.g., 2499 -> ₹2,499)
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  // EMPTY STATE: What to show if the cart has no items
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our top categories to find your new favorite items.
        </p>
        <Link href="/men" className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-emerald-700 transition shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  // FILLED STATE: What to show when items are in the cart
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-10">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <ul className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <li key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                          <p className="text-lg font-black text-gray-900 ml-4">{formatCurrency(parsePrice(item.price) * item.quantity)}</p>
                        </div>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-500 mt-1">Price: {item.price}</p>
                      </div>

                      {/* Controls: Quantity & Remove */}
                      <div className="flex justify-between items-center mt-4 sm:mt-0">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition"
                          >
                            &minus;
                          </button>
                          <span className="px-4 py-2 font-medium text-gray-900 border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition"
                          >
                            &#43;
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping estimate</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-emerald-600">Free</span>
                  ) : (
                    <span className="font-medium text-gray-900">{formatCurrency(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax estimate</span>
                  <span className="font-medium text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Order Total</span>
                  <span className="text-2xl font-black text-gray-900">{formatCurrency(orderTotal)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    Spend {formatCurrency(5000 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>

              <button className="w-full bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300">
                Checkout Now
              </button>
              
              <div className="mt-6 flex justify-center items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}