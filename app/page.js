import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  // MOCK DATA: Categories
  const categories = [
    { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80', path: '/men' },
    { name: 'Women', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', path: '/women' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&q=80', path: '/kids' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80', path: '/accessories' },
  ];

  // MOCK DATA: Featured Products with INR (₹) Pricing
  const featuredProducts = [
    { id: 1, name: 'Classic Emerald Polo', price: '₹3,499', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80' },
    { id: 2, name: 'Tailored Fit Chinos', price: '₹4,999', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80' },
    { id: 3, name: 'Premium Linen Blend', price: '₹6,499', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80' },
    { id: 4, name: 'Urban Leather Jacket', price: '₹14,999', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[70vh] bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80" 
          alt="Spring Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-sm md:text-base text-emerald-300 font-bold tracking-widest uppercase mb-3">
            Spring / Summer 2026
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 shadow-sm">
            ELEVATE YOUR <br /> EVERYDAY
          </h1>
          <Link href="/new-arrivals" className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-300 shadow-lg">
            Shop New Arrivals
          </Link>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {categories.map((category) => (
            <Link key={category.name} href={category.path} className="group flex flex-col items-center cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-md group-hover:border-emerald-500 transition-all duration-300">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PROMO BANNER */}
      <section className="bg-emerald-50 py-12 md:py-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-8 md:p-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">The Workwear Edit</h2>
            <p className="text-gray-600 text-lg mb-8">
              Discover pieces that work as hard as you do. Tailored for comfort, designed for success.
            </p>
            <Link href="/workwear" className="text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1 hover:text-gray-900 hover:border-gray-900 transition-all">
              Explore the Collection &rarr;
            </Link>
          </div>
          <div className="md:w-1/2 h-64 md:h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1616086185090-67123955f0b5?w=1000&q=80" 
              alt="Workwear" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
          <Link href="/shop" className="hidden md:block text-emerald-600 font-semibold hover:underline">
            View all products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
                />
                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full bg-white text-gray-900 font-bold py-3 rounded shadow-lg hover:bg-emerald-600 hover:text-white transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              {/* Product Info */}
              <div>
                <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
                {/* Updated INR Price */}
                <p className="text-lg font-bold text-gray-900 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="text-emerald-600 font-semibold hover:underline">
              View all products &rarr;
            </Link>
        </div>
      </section>

    </div>
  );
}