'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MortalityHistoryPage() {
  const [entries, setEntries] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [pond, setPond] = useState([]);
  const [filters, setFilters] = useState({
    pond: '',
    date: '',
    cause: '',
    image: '',
  });

//  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mortalityData'));
    const ponds = JSON.parse(localStorage.getItem('ponds'));
    if (saved) {
      setEntries(saved);
    }
    if (ponds){
      const selectedPond = ponds.find(p => p.name === filters.pond);
      setPonds(ponds);
      setPond(selectedPond || null);
    }

  }, [filters.pond]);
  const handleFilterChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };
  console.log(filters.pond);
  // Filter entries based on the selected filters
  const filteredEntries = entries.filter((entry) => {
    return (
      (filters.pond ? entry.name === filters.pond : true) &&
      (filters.date ? entry.date === filters.date : true) &&
      (filters.cause ? entry.cause.includes(filters.cause) : true)
    );
  });
  console.log(filteredEntries);
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-blue-900 text-bg">Search Mortality History</h1>

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
            {ponds && ponds.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
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

      <div className="mortality-desc">
        {filteredEntries.length === 0 ? (
          <p className="text-gray-500 no-record">No matching records found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredEntries.map((entry, index) => (
              <li key={index} className="mortality bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
               <div><strong>{entry.name}</strong></div>
                <div>
                <div className="text-gray-800">Date:</div> {new Date(entry.date).toLocaleDateString()}
                  </div>
                <span className="text-sm text-gray-500">
                  <div className="entry text-gray-800">Count:</div> {entry.count}
                </span>
                <span className="cause text-sm text-gray-500">
                  <div className="text-gray-800">Cause:</div> {entry.cause}
                </span>
                {entry.image && (
                  <div className="mt-2">
                    <img
                      src={entry.image}
                      alt="Mortality"
                      className="w-32 h-32 object-cover border rounded"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MortalityHistoryPage;
