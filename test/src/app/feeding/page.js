'use client';
import imageCompression from 'browser-image-compression';
import { useState, useEffect } from 'react';
import FeedingChart from '../../components/FeedingChart';

const feedTypes = {
    Catfish: [
      { stage: "Starter", size: "0.2 mm", description: "Used during early fry stage (0-2 weeks)" },
      { stage: "Crumble", size: "0.5 mm", description: "Small fry, transitioning to fingerlings" },
      { stage: "Pre-grower", size: "1 mm", description: "For fingerlings (2-4 weeks)" },
      { stage: "Freshwater Shrimp (Ochong'a)", size: "1-5 mm", description: "For juveniles and adults (~1 month+)" },
      { stage: "BSF Larval Meal", size: "1.5-2 mm", description: "For juveniles and adults (~1 month+)" },
      { stage: "Grower", size: "2 mm", description: "For juveniles (~1 month+)" },
      { stage: "Grower Plus", size: "3 mm", description: "Sub-adults, supports fast growth" },
      { stage: "Finisher", size: "4-6 mm", description: "Final stage before harvest (~3+ months)" }
    ],
    Tilapia: [
      { stage: "Starter", size: "0.5 mm", description: "Used during fry stage (0-2 weeks)" },
      { stage: "Pre-grower", size: "1 mm", description: "For fingerlings (2-4 weeks)" },
      { stage: "Freshwater Shrimp (Ochong'a)", size: "1-5 mm", description: "For juveniles and adults (~1 month+)" },
      { stage: "BSF Larval Meal", size: "1.5-2 mm", description: "For juveniles and adults (~1 month+)" },
      { stage: "Grower", size: "2 mm", description: "Juveniles and sub-adults" },
      { stage: "Finisher", size: "3-4 mm", description: "Market size tilapia, final growth phase" }
    ]
};

export default function FeedingTrackerPage() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
    date: '',
    weight: '',
    species:'',
    feedtype:'',
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
    const saved = localStorage.getItem('feedingData');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('feedingData', JSON.stringify(entries));
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
    if (!newEntry.pond || !newEntry.date || !newEntry.weight || !newEntry.feedType) return;

    setEntries([newEntry, ...entries]);
    const prevFeeds = freshPond.feedings || [];
    const feedNumber = prevFeeds.length + 1;
    const weight = Number(newEntry.weight);
    const prevCumulative = prevFeeds.length > 0 && prevFeeds[prevFeeds.length - 1].cumulativeWeight ? prevFeeds[prevFeeds.length - 1].cumulativeWeight : 0;
    const cumulativeWeight = prevCumulative + weight;
    const newFeed = {
      feedNumber: feedNumber,
      date: newEntry.date,
      weight: weight,
      cumulativeWeight: cumulativeWeight,
      image: fishImage,
      feedType: newEntry.feedType,
    }
    const updatedFormData = {
      name: formData.pond,
      ...newFeed
    }
    setEntries([updatedFormData, ...entries]);
    const updatedPond = {
      ...freshPond,
      feedings: [...prevFeeds, newFeed]
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
  const recentFeeds = Object.values(groupByPond);
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
      maxSizeMB: 0.2,        // Target max size ~200KB
      maxWidthOrHeight: 800, // Resize if too large
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
  let feeds = [];
  if (pond) feeds = feedTypes[pond.species];
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="center-txt"><h1 className="text-2xl font-semibold text-blue-900 text-bg">Feed Tracker</h1></div>
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
          <label className="text-lg font-semibold text-blue-800 mb-2">Feeding Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
    className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

      <div>
      <label className="text-lg font-semibold text-blue-800 mb-2">Feed Amount ({unit})</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          />
        </div>

      <div>
      <p className="text-sm text-gray-600 mb-4">Species: {pond && pond.species ? pond.species: ''}</p>
          <label className="text-lg font-semibold text-blue-800 mb-2">Feed Type</label>
          <select
            name="feedType"
            value={formData.feedType}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm text-blue-500"
          >
      <option value="">-- Select Feed Type --</option>
      {feeds && feeds.map((p, index) => (
          <option key={index} value={p.stage}>{p.stage} {p.size}</option>
      ))}
    </select>
        </div>
      <div>
      <div className="text-lg font-semibold text-blue-800 mb-2">Upload Feed Image (optional)</div>
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
      alt="Feed"
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
      <div className="center-txt"><h2 className="text-xl font-semibold mb-2 text-gray-500 text-bg">Feeding History</h2></div>
      {recentFeeds.length === 0 ? (
          <p className="text-gray-500 no-record">No feeding records yet.</p>
      ) : (
          <ul className="space-y-2">
          {recentFeeds.map((entry, index) => (
              <li key={index} className="bg-blue-50 border p-3 text-gray-500 rounded shadow-sm">
              <strong>{entry.name}</strong> – {entry.weight} {unit}, {entry.count} fish<br />
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </li>
          ))}
        </ul>
      )}
    </div>
      <hr/>
      <div>
      <div className="center-txt"><h2 className="text-xl font-semibold mb-2 text-gray-500 text-bg">Feeding Trends</h2></div>
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
     {pond && <FeedingChart feedings={pond.feedings} />}
    </div>
      </div>
  );
}
