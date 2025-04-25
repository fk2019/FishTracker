'use client';
import React, { useState, useEffect } from 'react';
import MortalityChart from '../../../components/MortalityChart';

function MortalityLogPage () {
  const [pond, setPond] = useState('');
  const [mortalityDate, setMortalityDate] = useState('');
  const [mortalityCount, setMortalityCount] = useState('');
  const [mortalityCause, setMortalityCause] = useState('');
  const [mortalityImage, setMortalityImage] = useState(null);

  const mortalityLogs = JSON.parse(localStorage.getItem('mortalityLogs') || '[]');
  const handleMortalitySubmit = (e) => {
    e.preventDefault();


    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setMortalityImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    };
    const newEntry = {
      pond,
      date: mortalityDate,
      count: parseInt(mortalityCount),
      cause: mortalityCause,
      image: mortalityImage, // add this
    };
    
    const updatedLogs = [...mortalityLogs, newEntry];
    localStorage.setItem('mortalityLogs', JSON.stringify(updatedLogs));
    setPond('');
    setMortalityDate('');
    setMortalityCount('');
    setMortalityCause('');
  };

  return (
      <div className="p-4">
      <h2 className="text-lg font-semibold mt-8 mb-2">Mortality Log</h2>
      <form onSubmit={handleMortalitySubmit} className="mb-4 space-y-2">
      <div>
      <label className="block text-sm font-medium">Pond</label>
      <select
    name="pond"
    value={pond}
    onChange={(e) => setPond(e.target.value)}
    className="w-full border p-2 rounded"
      >
      <option value="">-- Select Pond --</option>
            <option value="Pond A">Pond A</option>
      <option value="Pond B">Pond B</option>
      <option value="Pond C">Pond C</option>
      </select>
      </div> //pond
      <div>
      <label className="block text-sm font-medium">Date</label>
      <input
    name="date"
    type="date"
    className="w-full border p-2 rounded"
    value={mortalityDate}
      onChange={(e) => setMortalityDate(e.target.value)}
    required
      />
      </div> //date
      <div>
      <label className="block text-sm font-medium">Count</label>
      <input
    type="number"
    className="w-full border rounded px-2 py-1"
    value={mortalityCount}
    onChange={(e) => setMortalityCount(e.target.value)}
      required
      />
      </div> //count
      <div>
      <label className="block text-sm font-medium">Cause (optional)</label>
      <input
    type="text"
    className="w-full border rounded px-2 py-1"
    value={mortalityCause}
    onChange={(e) => setMortalityCause(e.target.value)}
      />
      </div> //cause
      <div>
      <label className="block text-sm font-medium">Upload Image (optional)</label>
      <input
    type="file"
    accept="image/*"
    className="w-full border rounded px-2 py-1"
    onChange={(e) => handleImageUpload(e)}
      />
      </div> //image
      <button
    type="submit"
    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
      >
      Add Mortality
    </button>
      </form>
      <MortalityLogTable entries={mortalityLogs}/>
      </div>
      
    );
}
const MortalityLogTable = ({ entries }) => {
  return (
      <div className="mt-6">
      <h2 className="text-lg font-bold">Mortality Logs</h2>
      <table className="table-auto w-full mt-2 border-collapse">
      <thead>
      <tr>
      <th className="border p-2">Pond</th>
      <th className="border p-2">Date</th>
      <th className="border p-2">Count</th>
      <th className="border p-2">Cause</th>
      <th className="border p-2">Image</th>
      </tr>
      </thead>
      <tbody>
      {entries.map((entry, index) => (
          <tr key={index}>
          <td className="border p-2">{entry.pond}</td>
          <td className="border p-2">{entry.date}</td>
          <td className="border p-2">{entry.count}</td>
          <td className="border p-2">{entry.cause}</td>
          <td className="border p-2">{entry.image}</td>
          </tr>
      ))}
    </tbody>
      </table>
      </div>
  );
};

export default MortalityLogPage;
