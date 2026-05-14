"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // <-- 1. Import toast

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('myShopCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('myShopCart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // Add Item
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // 2. REPLACE ALERT WITH TOAST!
    toast.success(`${product.name} added to cart!`);
  };

  // Remove Item Completely
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    // Optional: Add a toast for removal too!
    toast.error('Item removed from cart');
  };

  // NEW: Update Quantity (+ or -)
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isMounted) return null;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}