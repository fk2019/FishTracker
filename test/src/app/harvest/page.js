'use client';
import imageCompression from 'browser-image-compression';
import { useState, useEffect } from 'react';
import HarvestingChart from '../../components/HarvestingChart';
export default function HarvestingTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
    date: '',
    averageWeight: '',
    totalWeight: '',
    count: '',
  });
  const [unit, setUnit] = useState('');
  const [ponds, setPonds] = useState([]);
  const [pond, setPond] = useState([]);
  const [fishImage, setFishImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUnit(user.weightUnit || 'kg');

  },[]);
  useEffect(() => {
    const savedPonds = JSON.parse(localStorage.getItem('ponds'));
    setPonds(savedPonds);
  }, []);
  //select pond
  useEffect(() => {
    if (ponds){
      const selectedPond = ponds.find(p=>p.name === formData.pond);
      setPond(selectedPond || null);
    }
  }, [formData.pond,ponds]);

  useEffect(() => {
    const saved = localStorage.getItem('harvestingData');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('harvestingData', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updatedformData = {...formData, image:fishImage};
  const handleChartChange = (e) => {
    setChartData({ ...chartData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ponds = JSON.parse(localStorage.getItem('ponds')) || [];

    const freshPond = ponds.find(p => p.name === pond.name) || pond;
    const newEntry = { ...formData };
    if (!newEntry.pond || !newEntry.date || !newEntry.averageWeight || !newEntry.count) return;

    setEntries([newEntry, ...entries]);
    const prevHarvests = freshPond.harvests || [];
    const harvestNumber = prevHarvests.length + 1;
    const count = Number(newEntry.count);
    const prevCumulative = prevHarvests.length > 0 && prevHarvests[prevHarvests.length - 1].cumulative ? prevHarvests[prevHarvests.length - 1].cumulative : 0;
    const cumulativeCount = prevCumulative + count;
    const newHarvest = {
      harvestNumber: harvestNumber,
      date: newEntry.date,
      averageWeight: newEntry.averageWeight,
      count: count,
      cumulative: cumulativeCount,
      image: fishImage,
    }
    const updatedFormData = {
      name: formData.pond,
      ...newHarvest
    }
    setEntries([updatedFormData, ...entries]);
    const updatedPond = {
      ...freshPond,
      harvests: [...prevHarvests, newHarvest]
    }
    const updatedPonds = ponds.map(p => p.name === pond.name ? updatedPond : p);
    localStorage.setItem('ponds', JSON.stringify(updatedPonds));
  };
  //history
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
  const recentHarvests = Object.values(groupByPond);
  //chart
  useEffect(() => {
    const savedPonds = JSON.parse(localStorage.getItem('ponds')) || [];
    const freshPond = savedPonds.find(p => p.name === formData.pond) || pond;
    setPond(freshPond);
  }, [formData.pond]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
    const compressedFile = await imageCompression(file, options);
    const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
    setFishImage(base64);
  } catch (error) {
    console.error('Image compression failed:', error);
  }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="center-txt"><h1 className="text-2xl font-semibold text-blue-900 text-bg">Harvest Tracker</h1></div>
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
      {ponds && ponds.map((p) => (
          <option key={p.name} value={p.name}>{p.name}</option>
      ))}
          </select>
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Harvesting Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
    className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

      <div>
      <label className="text-lg font-semibold text-blue-800 mb-2">Average Weight ({unit})</label>
          <input
            type="number"
            name="averageWeight"
            value={formData.averageWeight}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
      </div>
      <div>
      <label className="text-lg font-semibold text-blue-800 mb-2">Total Weight ({unit})</label>
          <input
            type="number"
            name="totalWeight"
            value={formData.totalWeight}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

        <div>
          <label className="text-lg font-semibold text-blue-800 mb-2">Number of Fish Harvested</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>
      <div>
      <div className="text-lg font-semibold text-blue-800 mb-2">Upload Image (optional)</div>
      <label className="w-full border p-2 rounded text-sm text-blue-500 upload" htmlFor="upload">Choose file</label>
      <input
    id="upload"
    type="file"
    accept="image/*"
    className="w-full border p-2 rounded text-sm text-blue-500 hidden"
    onChange={(e) => handleImageUpload(e)}
      />
      </div>
      {updatedformData.image && (
        <div className="mt-2">
        <img
      src={updatedformData.image}
      alt="Harvested Fish"
      className="w-32 h-32 object-cover border rounded"
        />
        </div>
    )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <div>
      <hr/>
      <div className="center-txt"><h2 className="text-xl font-semibold mb-2 text-gray-500 text-bg">Harvest History</h2></div>
      {recentHarvests.length === 0 ? (
          <p className="text-gray-500 no-record">No harvesting records yet.</p>
      ) : (
          <ul className="space-y-2">
          {recentHarvests.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
              <strong>{entry.name}</strong> – {entry.totalWeight} {unit}, {entry.count} fish<br />
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      )}
    </div>
      <hr/>
      <div>
      <div className="center-txt"><h2 className="text-xl font-semibold mb-2 text-gray-500 text-bg">Harvest Trends</h2></div>
      <div>
      <select
    name="pond"
    value={formData.pond}
    onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500 bg-white"
      >
      <option value="">-- Select Pond --</option>
      {ponds && ponds.map((p) => (
          <option key={p.name} value={p.name}>{p.name}</option>
      ))}
    </select>
      </div>
     {pond && <HarvestingChart harvests={pond.harvests} />}
    </div>
      </div>
  );
}
