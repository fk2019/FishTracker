'use client'
import {Dashboard} from '../../components/Dashboard';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name || '');
      setFarmName(user.farmName || '');
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-blue-900 text-bg">
      Welcome {name ? `${name} to your dashboard`: 'to your dashboard'}!
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Total Fish Stock</h2>
          <p className="text-2xl font-bold text-blue-700">12,450</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Feed Used Today (kg)</h2>
          <p className="text-2xl font-bold text-blue-700">32.5</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Mortalities Today</h2>
          <p className="text-2xl font-bold text-blue-700">3</p>
        </div>
      </div>

      {/* Placeholder for chart or recent log summary */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Recent Activity</h2>
        <ul className="text-gray-700 text-sm list-disc list-inside">
          <li>8:00 AM – Fed Pond 1 (4kg)</li>
          <li>12:00 PM – Fed Pond 2 (5kg)</li>
          <li>2:00 PM – Grading done in Pond 3</li>
        </ul>
      </div>
    </div>
  );
}
