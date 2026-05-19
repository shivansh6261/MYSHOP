"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  
  // Dummy data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Men', description: 'Men\'s clothing, shoes, and accessories', products: 120 },
    { id: 2, name: 'Women', description: 'Women\'s ethnic and western wear', products: 185 },
    { id: 3, name: 'Kids', description: 'Toys and clothing for children', products: 45 },
    { id: 4, name: 'Accessories', description: 'Watches, belts, and jewelry', products: 30 },
  ]);

  const handleCreate = (e) => {
    e.preventDefault();
    const catObj = {
      id: Math.random(),
      name: newCategory.name,
      description: newCategory.description,
      products: 0 // New categories start with 0 products
    };
    
    setCategories([...categories, catObj]);
    setNewCategory({ name: '', description: '' });
    setIsAdding(false);
    toast.success('Category created!');
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure? Products in this category will need a new category.')) {
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Organize your products into easy-to-find sections.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700">
          {isAdding ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input type="text" required placeholder="e.g. Winter Wear" value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2 flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input type="text" placeholder="Short description..." value={newCategory.description} onChange={(e) => setNewCategory({...newCategory, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 h-[42px]">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                  {category.products} items
                </span>
              </div>
              <p className="text-gray-500 text-sm">{category.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
              <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}