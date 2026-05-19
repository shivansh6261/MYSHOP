"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: 1, customer: 'Anita Desai', product: 'Blue Cotton Saree', rating: 5, text: 'Absolutely love the quality! The color is exactly as shown in the picture.', status: 'Pending', date: '2026-05-18' },
    { id: 2, customer: 'Vikram Singh', product: 'Men\'s Denim Jacket', rating: 2, text: 'Size runs a bit small. I had to return it.', status: 'Approved', date: '2026-05-15' },
    { id: 3, customer: 'Spam Bot', product: 'Kids T-Shirt', rating: 5, text: 'Buy cheap crypto here!! www.fake-link.com', status: 'Pending', date: '2026-05-19' },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`Review ${newStatus.toLowerCase()}!`);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>
        <p className="text-gray-500 mt-1">Approve real customer feedback and delete spam.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Customer & Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Product & Rating</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Review</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id} className={review.status === 'Rejected' ? 'opacity-50 bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900">{review.customer}</div>
                  <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{review.product}</div>
                  <div className="text-yellow-400 text-lg tracking-widest">{renderStars(review.rating)}</div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs truncate">{review.text}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    review.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    review.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3 text-sm font-medium">
                  {review.status === 'Pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(review.id, 'Approved')} className="text-emerald-600 hover:text-emerald-900">Approve</button>
                      <button onClick={() => handleStatusUpdate(review.id, 'Rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                    </>
                  )}
                  {review.status !== 'Pending' && (
                     <button onClick={() => handleStatusUpdate(review.id, 'Pending')} className="text-gray-500 hover:text-gray-900">Revert</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}