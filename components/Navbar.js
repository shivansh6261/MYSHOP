"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/superbase'; // <-- Import Supabase
import toast from 'react-hot-toast'; // <-- Import Toast for logout message

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls the dropdown
  const [user, setUser] = useState(null); // Stores the logged-in user
  
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();

  // 1. Listen for User Login/Logout status
  useEffect(() => {
    // Check if user is already logged in when the page loads
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    fetchUser();

    // Listen for any changes (like when they log in or log out)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 2. Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    setIsProfileOpen(false);
    router.push('/'); // Send them to the homepage
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Kids', path: '/kids' },
    { name: 'Accessories', path: '/accessories' },
  ];

  return (
    <nav className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
          
            <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tighter">
            {/* <span>< img src="/favicon.ico" alt="" className="h-8 w-auto mb-1 display-inline-block" /></span>  */}
              MY<span className="text-gray-800">SHOP</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop Right Side (Auth + Cart) */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* CONDITIONAL RENDER: Profile Dropdown OR Login/Signup */}
            {user ? (
              <div className="relative">
                {/* Profile Button */}
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition focus:outline-none"
                >
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                    {/* Show the first letter of their email */}
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <span>My Account</span>
                  <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    
                    <Link href="/profile/orders" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Your Orders</Link>
                    <Link href="/profile/subscribe" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Subscribe & Save</Link>
                    <Link href="/profile/addresses" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Addresses</Link>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // If NOT logged in, show these:
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition">Log in</Link>
                <Link href="/signup" className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition shadow-md">Sign up</Link>
              </>
            )}
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             {/* Mobile Cart Icon */}
             <Link href="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">{totalItems}</span>
              )}
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-emerald-600 focus:outline-none p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-emerald-50 shadow-lg absolute w-full`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.path ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"}`}>
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Auth/Profile Links */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">My Account</p>
                  <p className="text-sm font-medium text-gray-900 truncate mb-4">{user.email}</p>
                </div>
                <Link href="/profile/orders" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Your Orders</Link>
                <Link href="/profile/subscribe" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Subscribe & Save</Link>
                <Link href="/profile/addresses" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Addresses</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-4">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-3 py-2 text-gray-600 font-medium">Log in</Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center bg-emerald-600 text-white px-3 py-2 rounded-md font-medium shadow-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};