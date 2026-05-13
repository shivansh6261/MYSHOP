"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Kids', path: '/kids' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tighter">
              MY<span className="text-gray-800">SHOP</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation (Center) */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-all duration-200 hover:text-emerald-500 ${
                  pathname === link.path 
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1" 
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. Login/Signup (Desktop Right) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
            >
              Sign up
            </Link>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-emerald-50`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.path 
                  ? "bg-emerald-50 text-emerald-600" 
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Auth Links */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col space-y-2">
            <Link 
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-3 py-2 text-gray-600 font-medium"
            >
              Log in
            </Link>
            <Link 
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-emerald-600 text-white px-3 py-2 rounded-md font-medium shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};