'use client';
import React, { useState } from 'react';
import FeedChart from '../../components/FeedChart';
function FeedingLogPage() {
  const [feedType, setFeedType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pond, setPond] = useState('');
  const [time, setTime] = useState('');
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem('feedingLogs')) || []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      pond,
      date: new Date().toLocaleDateString(),
      time,
      feedType,
      quantity,
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('feedingLogs', JSON.stringify(updatedEntries));
    // Reset form
    setPond('');
    setFeedType('');
    setQuantity('');
    setTime('');
  };
 
  return (
      <div className="p-4">
      <h1 className="text-xl font-bold">Log Feeding Details</h1>
      <form onSubmit={handleSubmit} className="mt-4">
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
      </div>
      <div>
      <label className="block">Feed Type:</label>
      <input
            type="text"
    value={feedType}
    onChange={(e) => setFeedType(e.target.value)}
    required
    className="border p-2 w-full"
      />
        </div>
      <div className="mt-2">
      <label className="block">Quantity (kg):</label>
      <input
            type="number"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    required
    className="border p-2 w-full"
      />
        </div>
      <div className="mt-2">
      <label className="block">Time of Feeding:</label>
      <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    required
    className="border p-2 w-full"
      />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      <FeedingLogTable entries={entries} />
      <FeedChart entries={entries} />
      </div>
  );
};



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
