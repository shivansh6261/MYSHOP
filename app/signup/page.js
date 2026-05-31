"use client";

import React, { useState } from 'react';
import { supabase } from '../../lib/superbase'; // Make sure this path matches your project!
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const redirectUrl = searchParams.get('redirect') || '/'; 

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false); // 🚀 FIX 1: Added this missing state!

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✨ SMART FEATURE: Auto-fetch City & State when Pincode is 6 digits
    if (name === 'pincode' && value.length === 6) {
      fetchLocationFromPincode(value);
    }
  };

 const fetchLocationFromPincode = async (pincode) => {
    setIsFetchingLocation(true);
    try {
      // 🚀 UPGRADED: Using a highly reliable API that doesn't block localhost (CORS-friendly)
      const response = await fetch(`https://api.zippopotam.us/IN/${pincode}`);
      
      if (response.ok) {
        const data = await response.json();
        const place = data.places[0];
        
        setFormData(prev => ({
          ...prev,
          city: place["place name"], 
          state: place["state"]      
        }));
        
        toast.success('Location auto-filled! 📍');
      } else {
        toast.error('Invalid Pincode. Please enter details manually.');
      }
    } catch (error) {
      console.error("Error fetching location", error);
      toast.error('Network error. Please type city/state manually.');
    } finally {
      setIsFetchingLocation(false);
    }
  };
  // GPS Feature
  // 🚀 UPGRADED: Real-time Reverse Geocoding for GPS
  const useDeviceLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Fetching exact GPS location...', { id: 'gps' });
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use OpenStreetMap's free API to convert coordinates to an address
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
          const data = await response.json();

          if (data && data.address) {
            setFormData(prev => ({
              ...prev,
              city: data.address.city || data.address.state_district || data.address.county || prev.city,
              state: data.address.state || prev.state,
              pincode: data.address.postcode || prev.pincode
            }));
            
            toast.success('Location auto-filled via GPS! 📍', { id: 'gps' });
          } else {
            toast.error('Could not read GPS address.', { id: 'gps' });
          }
        } catch (err) {
          toast.error('Network error finding GPS address.', { id: 'gps' });
        }
      },
      (error) => {
        toast.error('Please allow location access in your browser pop-up.', { id: 'gps' });
      }
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create the user authentication account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Save their shipping details to the database profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: authData.user.id,
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }
        ]);

        if (profileError) throw profileError;
      }

      toast.success('Account created successfully! 🎉');
      
      // 🚀 FIX 2: Dynamic redirect! Sends them to checkout if they came from cart, or Home if not.
      router.push(redirectUrl); 

    } catch (error) {
      toast.error(error.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-black text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link href={`/login?redirect=${redirectUrl}`} className="font-medium text-emerald-600 hover:text-emerald-500">sign in to your existing account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>

            {/* Account Details */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email address</label>
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input name="password" type="password" required minLength="6" value={formData.password} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Default Shipping Address</h3>
                <button type="button" onClick={useDeviceLocation} className="text-sm text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Use GPS
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number (10 digits)</label>
                  <input name="phone" type="tel" required pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input name="address" type="text" required value={formData.address} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 flex justify-between">
                    Pincode
                    {isFetchingLocation && <span className="text-emerald-500 text-xs animate-pulse">Loading...</span>}
                  </label>
                  <input name="pincode" type="text" required maxLength="6" value={formData.pincode} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. 400001" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input name="city" type="text" required value={formData.city} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input name="state" type="text" required value={formData.state} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up & Save Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}