'use client';

import { useState, useEffect } from 'react';
import GradingChart from '../../components/GradingChart';
import AuthWrapper from '../../components/AuthWrapper';

export default function GradingTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
    date: '',
    averageWeight: '',
    count: '',
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gradingData');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gradingData', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (!newEntry.pond || !newEntry.date || !newEntry.averageWeight || !newEntry.count) return;

    setEntries([newEntry, ...entries]);
    setFormData({
      pond: '',
      date: '',
      averageWeight: '',
      count: '',
    });
  };

  useEffect(() => {
    // Here you can fetch the data from an API or define it manually
    // For now, we'll use static data as an example

    const fetchedEntries = [
      { date: '2023-01-01', pond: 'Pond A', averageWeight: 1.5 },
      { date: '2023-01-15', pond: 'Pond A', averageWeight: 1.7 },
      { date: '2023-01-01', pond: 'Pond B', averageWeight: 1.3 },
      { date: '2023-01-15', pond: 'Pond B', averageWeight: 1.6 },
      { date: '2023-01-01', pond: 'Pond C', averageWeight: 1.2 },
      { date: '2023-01-15', pond: 'Pond C', averageWeight: 1.4 },
    ];

    // Update the state with fetched data
    setEntries(fetchedEntries);
  }, []);
  return (
    <AuthWrapper>
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-blue-900">Grading Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded mb-6">
        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Pond</label>
          <select
            name="pond"
            value={formData.pond}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          >
            <option value="">-- Select Pond --</option>
            <option value="Pond A">Pond A</option>
            <option value="Pond B">Pond B</option>
            <option value="Pond C">Pond C</option>
          </select>
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Grading Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Average Weight (g)</label>
          <input
            type="number"
            name="averageWeight"
            value={formData.averageWeight}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
            placeholder="e.g. 45"
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Number of Fish Counted</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
            placeholder="e.g. 120"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-500">Grading History</h2>
      {entries.length === 0 ? (
          <p className="text-gray-500">No grading records yet.</p>
      ) : (
          <ul className="space-y-2">
          {entries.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
                <strong>{entry.pond}</strong> – {entry.averageWeight}g, {entry.count} fish<br />
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      )}
    </div>
      <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-500">Growth Trends</h2>
      <GradingChart entries={entries} />
    </div>
      </div>
      </AuthWrapper>
  );
}
