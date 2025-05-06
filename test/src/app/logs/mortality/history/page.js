'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MortalityHistoryPage() {
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({
    pond: '',
    date: '',
    cause: '',
  });

//  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mortalityData');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter entries based on the selected filters
  const filteredEntries = entries.filter((entry) => {
    return (
      (filters.pond ? entry.pond === filters.pond : true) &&
      (filters.date ? entry.date === filters.date : true) &&
      (filters.cause ? entry.cause.includes(filters.cause) : true)
    );
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-blue-900">Full Mortality History</h1>

      <div className="space-y-4 bg-white p-4 shadow rounded mb-6">
        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Pond</label>
          <select
            name="pond"
            value={filters.pond}
            onChange={handleFilterChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          >
            <option value="">-- Select Pond --</option>
            <option value="Pond A">Pond A</option>
            <option value="Pond B">Pond B</option>
            <option value="Pond C">Pond C</option>
          </select>
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Cause</label>
          <input
            type="text"
            name="cause"
            value={filters.cause}
            onChange={handleFilterChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        {filteredEntries.length === 0 ? (
          <p className="text-gray-500">No matching records found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredEntries.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
                <strong>{entry.pond}</strong> {new Date(entry.date).toLocaleDateString()}
              
                <br />
                <span className="text-sm text-gray-500">
                {entry.count} fish,  {entry.cause}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MortalityHistoryPage;
