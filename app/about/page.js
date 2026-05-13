import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" 
          alt="Our Store" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            OUR STORY
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl">
            We believe that premium quality and timeless design should be accessible to everyone. 
            Welcome to the future of everyday wear.
          </p>
        </div>
      </section>

      {/* 2. THE MISSION (Split Text/Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Born from a simple idea.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2026, MYSHOP started with a singular vision: to create clothing that works as hard as you do. We were tired of the fast-fashion cycle—clothes that lose their shape after one wash, or premium brands that charge outrageous markups.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              By partnering directly with the world's best ethical factories and cutting out the middlemen, we are able to bring you exceptional fabrics, sharp tailoring, and modern silhouettes at a fraction of the traditional retail price.
            </p>
          </div>
          <div className="lg:w-1/2 h-96 lg:h-[500px] w-full relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80" 
              alt="Clothing Design" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Grid) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">The principles that guide everything we make and do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Uncompromising Quality</h3>
              <p className="text-gray-600">We source the finest materials to ensure every piece we create is built to last, wear after wear.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Practices</h3>
              <p className="text-gray-600">From ethical factories to eco-friendly packaging, we are committed to reducing our environmental footprint.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">Your satisfaction is our priority. We offer hassle-free returns and a dedicated support team ready to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS BANNER */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-emerald-500">
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">1M+</div>
              <div className="text-emerald-100 font-medium uppercase tracking-wider text-sm">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">50k+</div>
              <div className="text-emerald-100 font-medium uppercase tracking-wider text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">100%</div>
              <div className="text-emerald-100 font-medium uppercase tracking-wider text-sm">Ethical Sourcing</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">24/7</div>
              <div className="text-emerald-100 font-medium uppercase tracking-wider text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Ready to upgrade your wardrobe?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our latest collections and find your new favorite pieces today.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/men" className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
            Shop Men
          </Link>
          <Link href="/women" className="bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md">
            Shop Women
          </Link>
        </div>
      </section>

    </div>
  );
}