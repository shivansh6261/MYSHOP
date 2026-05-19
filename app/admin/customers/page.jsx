"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/superbase';
import toast from 'react-hot-toast';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    // Fetch all orders to calculate customer data
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*');
    
    if (error) {
      toast.error("Failed to load customer data");
      setIsLoading(false);
      return;
    }

    // Group orders by customer email using a Javascript Map
    const customerMap = new Map();

    orders.forEach(order => {
      if (!customerMap.has(order.customer_email)) {
        customerMap.set(order.customer_email, {
          name: order.customer_name,
          email: order.customer_email,
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: order.created_at,
          address: order.shipping_address
        });
      }
      
      const customer = customerMap.get(order.customer_email);
      customer.totalOrders += 1;
      customer.totalSpent += parseFloat(order.total_amount);
      
      // Update last order date if this order is newer
      if (new Date(order.created_at) > new Date(customer.lastOrderDate)) {
        customer.lastOrderDate = order.created_at;
      }
    });

    // Convert Map back to array and sort by Total Spent (Highest first)
    const customerArray = Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
    
    setCustomers(customerArray);
    setIsLoading(false);
  };

  if (isLoading) return <div className="p-8 text-gray-500">Loading customers...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View your top buyers and their order history.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Total Orders</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Total Spent</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Last Order</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-black">
                  ₹{customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(customer.lastOrderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.address?.city}, {customer.address?.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}