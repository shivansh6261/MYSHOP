"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    // Step Management
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        contact: "", // Holds either Email or Phone
        address: "",
        password: "",
        verificationCode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        // Here you would trigger your backend API to send the OTP/Email verification
        console.log("Sending verification code to:", formData.contact);
        setStep(2); // Move to verification step
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        // Here you would verify the code and actually create the user account
        console.log("Creating account with data:", formData);
        alert("Account verified and created successfully!");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <Link href="/" className="text-3xl font-black text-emerald-600 tracking-tighter mb-6 inline-block">
                        MY<span className="text-gray-800">SHOP</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {step === 1 ? "Create an account" : "Verify your account"}
                    </h1>
                    <p className="text-gray-500">
                        {step === 1 
                            ? "Join us today to get started." 
                            : `We sent a 6-digit code to ${formData.contact}`}
                    </p>
                </div>

                {/* STEP 1: Main Signup Form */}
                {step === 1 && (
                    <form onSubmit={handleInitialSubmit} className="space-y-5">
                        
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                required
                            />
                        </div>

                        {/* Email or Phone Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact">
                                Email or Phone Number
                            </label>
                            <input
                                id="contact"
                                type="text"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="name@example.com or +1 234 567 890"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                required
                            />
                        </div>

                        {/* Address Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                                Shipping Address
                            </label>
                            <textarea
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Main St, City, Country"
                                rows="2"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                minLength="8"
                                required
                            />
                        </div>

                        {/* Submit Button (Triggers Step 2) */}
                        <button
                            type="submit"
                            className="w-full mt-4 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all"
                        >
                            Continue to Verification
                        </button>
                    </form>
                )}

                {/* STEP 2: Verification Form */}
                {step === 2 && (
                    <form onSubmit={handleVerificationSubmit} className="space-y-6 text-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4" htmlFor="verificationCode">
                                Enter Verification Code
                            </label>
                            <input
                                id="verificationCode"
                                type="text"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                placeholder="000000"
                                maxLength="6"
                                className="w-full text-center tracking-widest text-2xl font-bold px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all"
                        >
                            Verify & Create Account
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 mt-4 inline-block"
                        >
                            &larr; Wrong contact info? Go back
                        </button>
                    </form>
                )}

                {/* Footer */}
                <p className="mt-10 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}