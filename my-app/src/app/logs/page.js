'use client';
import React, { useEffect, useState } from 'react';
import FeedChart from '../../components/FeedChart';
import AuthWrapper from '../../components/AuthWrapper';
function FeedingLogPage() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
    date: '',
    time: '',
    feedType: '',
    quantity: ''
  });
  const [units, setUnits] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('feedingData');
    
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    const user_units = localStorage.getItem('settings');
    if (user_units) {
      setUnits(JSON.parse(user_units));
    }
  }, []);
  const unit = units.units;
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('feedingData', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (!newEntry.pond || !newEntry.date || !newEntry.feedType || !newEntry.quantity) return;

    setEntries([newEntry, ...entries]);
    setFormData({
      pond: '',
      date: '',
      time: '',
      feedType: '',
      quantity: '',
    });
  };

  useEffect(() => {
    // Here you can fetch the data from an API or define it manually
    // For now, we'll use static data as an example

    const fetchedEntries = [
      { date: '2023-01-01', pond: 'Pond A', feedType: "2mm" , quantity: 3, time: "12:22"},
      { date: '2023-01-15', pond: 'Pond A', feedType: "1.8mm", quantity: 28 },
      { date: '2023-01-01', pond: 'Pond B', feedType: "3mm", quantity: 5 },
      { date: '2023-01-15', pond: 'Pond B', feedType: "4.5mm", quantity: 10},
      { date: '2023-01-01', pond: 'Pond C', feedType: "", quantity: 9 },
      { date: '2023-01-15', pond: 'Pond C', feedType: "BSF", quantity: 10 },
    ];

    // Update the state with fetched data
    setEntries(fetchedEntries);
  }, []);
  return (
    <AuthWrapper>
    <div>
      <h1 className="text-2xl font-semibold text-blue-900">Feeding Tracker</h1>

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
          <label className="text-lg font-semibold text-blue-800 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>
        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Feed Type</label>
          <input
            type="text"
            name="feedType"
            value={formData.feedType}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
            placeholder="3mm"
          />
        </div>

        <div>
      <label className="text-lg font-semibold text-blue-800 mb-2">Quantity ({unit})</label>
          <input
            type="number"
            name="quantity"
            value={formData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
            placeholder="10"
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
      <h2 className="text-xl font-semibold mb-2 text-gray-500">Feeding History</h2>
      {entries.length === 0 ? (
          <p className="text-gray-500">No feeding records yet.</p>
      ) : (
          <ul className="space-y-2">
          {entries.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
                <strong>{entry.pond}</strong> – {entry.feedType}, {entry.quantity} kgs<br />
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      )}
    </div>
      <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-500">Growth Trends</h2>
      <FeedChart entries={entries} /> {/* Pass in entries as prop */}
    </div>
      </div>
      </AuthWrapper>
  );
}
///table
const FeedingLogTable = ({ entries }) => {
  return (
      <div className="mt-6">
      <h2 className="text-lg font-bold">Feeding Logs</h2>
      <table className="table-auto w-full mt-2 border-collapse">
      <thead>
      <tr>
      <th className="border p-2">Pond</th>
      <th className="border p-2">Date</th>
      <th className="border p-2">Feed Type</th>
      <th className="border p-2">Quantity (kg)</th>
      <th className="border p-2">Time</th>
      </tr>
      </thead>
      <tbody>
      {entries.map((entry, index) => (
          <tr key={index}>
          <td className="border p-2">{entry.pond}</td>
          <td className="border p-2">{entry.date}</td>
          <td className="border p-2">{entry.feedType}</td>
          <td className="border p-2">{entry.quantity}</td>
          <td className="border p-2">{entry.time}</td>
          </tr>
      ))}
    </tbody>
      </table>
      </div>
  );
};

export default FeedingLogPage;
