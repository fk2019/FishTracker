'use client';
import { useRouter} from 'next/navigation';
import React, { useState, useEffect } from 'react';
import MortalityChart from '../../../components/MortalityChart';
import AuthWrapper from '../../../components/AuthWrapper';
function MortalityLogPage () {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
    date: '',
    cause: '',
    count: '',
  });
  const router = useRouter();
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mortalityData');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('mortalityData', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };
  

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (!newEntry.pond || !newEntry.date || !newEntry.cause || !newEntry.count) return;

    setEntries([newEntry, ...entries]);
    setFormData({
      pond: '',
      date: '',
      cause: '',
      count: '',
    });
  };
  const groupByPond = entries.reduce((acc, entry) => {
    if (!acc[entry.pond]) {
      acc[entry.pond] = entry;
    } else {
      // Compare the dates to select the most recent entry for the pond
      const existingDate = new Date(acc[entry.pond].date);
      const newDate = new Date(entry.date);
      if (newDate > existingDate) {
        acc[entry.pond] = entry;
      }
    }
    return acc;
  }, {});
  const recentMortality = Object.values(groupByPond);
  const filteredEntry = formData.pond ? entries.filter((entry) => entry.pond === formData.pond) : [];
  useEffect(() => {
    // Here you can fetch the data from an API or define it manually
    // For now, we'll use static data as an example

    const fetchedEntries = [
      { date: '2023-01-01', pond: 'Pond A', count: 1, cause: 'Hypoxia' },
      { date: '2023-01-15', pond: 'Pond A', count: 3, cause: '' },
      { date: '2023-01-01', pond: 'Pond B', count: 1, cause: '' },
      { date: '2023-01-15', pond: 'Pond B', count: 0, cause: '' },
      { date: '2023-01-01', pond: 'Pond C', count: 5, cause: '' },
      { date: '2023-01-15', pond: 'Pond C', count: 7, cause: '' },
    ];

    // Update the state with fetched data
    setEntries(fetchedEntries);
  }, []);


  return (
    <AuthWrapper>
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-blue-900">Mortality Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded mb-6">
      <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Pond</label>
          <select
            name="pond"
            value={formData.pond}
            onChange={handleChange}
    className="w-full border p-2 rounded text-sm text-blue-500"
    required
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
          <label className="text-lg font-semibold text-blue-800 mb-2">Number of Mortalities</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
    
    required
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Cause</label>
          <input
            type="text"
            name="cause"
            value={formData.cause}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
    
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
      <h2 className="text-xl font-semibold mb-2 text-gray-500">Mortality History</h2>
      {recentMortality.length === 0 ? (
          <p className="text-gray-500">No mortality records yet.</p>
      ) : (
          <ul className="space-y-2">
          {recentMortality.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
                <strong>{entry.pond}</strong> – {entry.cause}, {entry.count} fish<br />
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      )}
    </div>
      <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-500">Mortality Trends</h2>

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
      <div className="mt-4">
        <button
          onClick={() => router.push('/logs/mortality/history')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Full Mortality History
        </button>
      </div>
      </form>
      <MortalityChart entries={filteredEntry}/>
      </div>
      </div>
      </AuthWrapper>
  );
}
export default MortalityLogPage;
