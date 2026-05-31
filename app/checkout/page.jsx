"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/superbase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Script from 'next/script'; // Next.js tag to load external scripts safely

export default function CheckoutPage() {
  const { cart: cartItems = [], removeFromCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'online' // Default to online
  });

  const updateMissingProfileData = async (userId, formData) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    })
    .eq('id', userId)
    .is('address', null); // Only updates if the address was previously NULL
};

  // 1. Fetch User Data on Load
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setFormData(prev => ({ ...prev, email: session.user.email }));
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return Number(String(price).replace(/[^\d.]/g, ''));
  };

  const subtotal = cartItems.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 499;
  const orderTotal = subtotal + shipping;

  // 2. Main Order Handler
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const shippingAddress = {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    };

    if (formData.paymentMethod === 'cod') {
      await processCOD(shippingAddress);
    } else {
      await processOnlinePayment(shippingAddress);
    }
  };

  // 3. Handle Cash On Delivery
  const processCOD = async (shippingAddress) => {
    try {
      const { error } = await supabase.from('orders').insert({
        user_id: user?.id || null,
        email: formData.email,
        shipping_address: shippingAddress,
        items: cartItems,
        total_amount: orderTotal,
        payment_method: 'cod',
        payment_status: 'pending'
      });

      if (error) throw error;

      toast.success('Order placed successfully via COD!');
      router.push('/success'); // Send to a success page
    } catch (err) {
      toast.error('Failed to place order. Try again.');
      setIsProcessing(false);
    }
  };

  // 4. Handle Razorpay Integration
  const processOnlinePayment = async (shippingAddress) => {
    try {
      // Step A: Ask our Next.js API for a Razorpay Order ID
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: orderTotal })
      });
      const orderData = await res.json();

      if (!orderData.orderId) throw new Error("Could not create Razorpay order");

      // Step B: Open the Razorpay Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy_key', 
        amount: orderData.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: orderData.orderId,
        handler: async function (response) {
          // Step C: Payment Success! Save to Supabase
          const { error } = await supabase.from('orders').insert({
            user_id: user?.id || null,
            email: formData.email,
            shipping_address: shippingAddress,
            items: cartItems,
            total_amount: orderTotal,
            payment_method: 'razorpay',
            payment_status: 'paid',
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id
          });

          if (error) {
            toast.error("Payment received, but order saving failed. Contact support.");
          } else {
            toast.success("Payment Successful! 🎉");
            router.push('/success');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: "#059669" } // Emerald-600
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
      // If Razorpay window closes without paying
      rzp1.on('payment.failed', function (response) {
        toast.error('Payment failed or cancelled.');
        setIsProcessing(false);
      });

    } catch (err) {
      toast.error('Failed to initialize payment gateway.');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-gray-50 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-black text-gray-900">Your cart is empty</h2>
        <Link href="/new-arrivals" className="mt-4 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay Script into the browser */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1 space-y-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-xl bg-white cursor-pointer hover:border-emerald-500">
                    <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleInputChange} className="w-5 h-5 text-emerald-600" />
                    <span className="ml-3 font-medium text-gray-900">Pay Online (Card / UPI / NetBanking)</span>
                  </label>
                  <label className="flex items-center p-4 border rounded-xl bg-white cursor-pointer hover:border-emerald-500">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="w-5 h-5 text-emerald-600" />
                    <span className="ml-3 font-medium text-gray-900">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

            </form>
          </div>

          <div className="lg:w-[400px]">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">₹{orderTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition flex justify-center items-center shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : (formData.paymentMethod === 'cod' ? 'Place COD Order' : 'Pay Now')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}