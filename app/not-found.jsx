"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md space-y-8">
        
        {/* Beautiful Animated Element */}
        <div className="relative flex items-center justify-center h-40">
          {/* Outer Pulse Ring */}
          <div className="absolute w-32 h-32 bg-emerald-100 rounded-full animate-ping opacity-75 duration-1000"></div>
          {/* Inner Glow Ring */}
          <div className="absolute w-28 h-28 bg-emerald-50 rounded-full shadow-inner animate-pulse"></div>
          {/* Core Icon Display */}
          <div className="relative bg-white border-2 border-emerald-500 text-emerald-600 rounded-3xl p-6 shadow-xl transform rotate-12 group hover:rotate-0 transition-transform duration-300">
            <span className="text-5xl block select-none">🛠️</span>
          </div>
        </div>

        {/* Text Messaging */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-gray-950 tracking-tight">
            Crafting Something Fresh!
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            This module is currently under construction. We are wiring up the backend gears right now!
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full mt-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
            Estimated Launch: Coming Very Soon
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all duration-200 text-sm active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Showroom
          </Link>
        </div>

      </div>
    </div>
  );
}