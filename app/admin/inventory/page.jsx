"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/superbase';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    // Fetch products and sort by stock quantity (Lowest stock first!)
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, stock_quantity, price, image_urls')
      .order('stock_quantity', { ascending: true });
    
    if (error) {
      toast.error("Failed to load inventory");
    } else {
      setInventory(data || []);
    }
    setIsLoading(false);
  };

  const handleStockUpdate = async (id, currentStock, change) => {
    const newStock = currentStock + change;
    if (newStock < 0) return; // Don't allow negative stock

    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', id);

    if (error) {
      toast.error("Failed to update stock");
    } else {
      toast.success("Stock updated!");
      fetchInventory(); // Refresh the data
    }
  };

  if (isLoading) return <div className="p-8 text-gray-500">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock & Inventory</h1>
        <p className="text-gray-500 mt-1">Monitor your product levels. Items with low stock are highlighted.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Current Stock</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Quick Adjust</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => {
              // Logic to determine stock status
              const isLowStock = item.stock_quantity > 0 && item.stock_quantity <= 5;
              const isOutOfStock = item.stock_quantity === 0;

              return (
                <tr key={item.id} className={`hover:bg-gray-50 ${isOutOfStock ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image_urls?.[0] || 'https://via.placeholder.com/40'} 
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        alt={item.name}
                      />
                      <div className="text-sm font-bold text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isOutOfStock ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">Out of Stock</span>
                    ) : isLowStock ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-700">Low Stock</span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">In Stock</span>
                    )}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-lg font-black ${isOutOfStock ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.stock_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleStockUpdate(item.id, item.stock_quantity, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center transition"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => handleStockUpdate(item.id, item.stock_quantity, 1)}
                        className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold flex items-center justify-center transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}