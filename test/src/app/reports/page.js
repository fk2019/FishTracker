'use client';
import React, { useEffect, useState } from 'react';
import FeedingChart from '../../components/FeedingChart';
import GradingChart from '../../components/GradingChart';

export default function ReportsPage() {
  const [entries, setEntries] = useState([]);
  const [harvest, setHarvest] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [pond, setPond] = useState([]);
  const [formData, setFormData] = useState({
    pond: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [stats, setStats] = useState({
    totalFeedings: 0,
    totalFeedQuantity: 0,
    averageFeedPerDay: 0,
    lastGradingAvgWeight: 0,
    totalMortalities: 0, // Optional: mock for now
  });

  useEffect(() => {
    const feedingLogs = JSON.parse(localStorage.getItem('feedingData') || '[]');
    const gradingLogs = JSON.parse(localStorage.getItem('gradingData') || '[]');
    const mortalityLogs = JSON.parse(localStorage.getItem('mortalityData') || '[]');
    const savedPonds = JSON.parse(localStorage.getItem('ponds')) || [];
    const selectedPond = savedPonds.find(p => p.name === formData.pond) || pond;
    setPond(selectedPond || null);
    setPonds(savedPonds);

    const feedRecord = feedingLogs.find(log => log.name === selectedPond.name);
    const feedRecords = feedingLogs.filter(log => log.name === selectedPond.name).slice(0, 2);
    let feedConsumed = feedRecords ? ((feedRecords[0] ? feedRecords[0].weight : 0) - (feedRecords[1] ? feedRecords[1].weight : 0)) : 0;
    feedConsumed = Math.abs(feedConsumed);
    const gradingRecord = gradingLogs.find(log => log.name === selectedPond.name);
    const gradingRecords = gradingLogs.filter(log => log.name === selectedPond.name).slice(0, 2);
    let weightGain = gradingRecords && gradingRecords[0] ? gradingRecords[0].totalWeight - (gradingRecords[1] ? gradingRecords[1].totalWeight : 0) : 0;
    weightGain = Math.abs(weightGain);
    const mortalityRecord = mortalityLogs.find(log => log.name === selectedPond.name);

    let totalFeedings = 0;
    let totalFeedQuantity = 0;
    if (feedRecord) {
      totalFeedings = feedRecord.feedNumber;
      totalFeedQuantity = feedRecord.cumulativeWeight;
    }
    const daysSet = new Set(feedingLogs.map(log => log.date));
    const averageFeedPerDay = daysSet.size > 0 ? (totalFeedQuantity / daysSet.size).toFixed(1) : 0;

    let lastGradingAvgWeight;
    let lastGradingTotalWeight;
    lastGradingAvgWeight = gradingRecord ? gradingRecord.averageWeight : 0;
    lastGradingTotalWeight = gradingRecord ? gradingRecord.totalWeight : 0;
    const fcr = weightGain === 0 ? 0 : (Math.abs(feedConsumed / weightGain) || 0);
    const prevTotalWeight = lastGradingTotalWeight;
    const totalMortalities = mortalityRecord ? mortalityRecord.cumulative : 0;
    setStats({
      totalFeedings,
      totalFeedQuantity,
      averageFeedPerDay,
      lastGradingTotalWeight,
      lastGradingAvgWeight,
      feedConsumed,
      weightGain,
      fcr,
      totalMortalities,
    });
  }, [formData.pond]);

  return (
    <div className="p-4">
      <div className="center-txt-button"><h1 className="text-xl font-bold mb-4 text-blue-900 text-bg dark-green">Reports & Insights</h1>
        <div className="report">
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
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Feedings" value={stats.totalFeedings} />
        <StatCard title="Total Feed (kg)" value={stats.totalFeedQuantity} />
        <StatCard title="Avg Feed/Day (kg)" value={stats.averageFeedPerDay} />
        <StatCard title="Total Weight (Last Grading)" value={stats.lastGradingTotalWeight} />
        <StatCard title="Avg Weight (Last Grading)" value={stats.lastGradingAvgWeight} />
        <StatCard title="Feed Consumed" value={stats.feedConsumed} />
        <StatCard title="Weight Gain" value={stats.weightGain} />
        <StatCard title="FCR" value={stats.fcr} />
        <StatCard title="Total Mortalities" value={stats.totalMortalities} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pond.feedings &&
         <div className="p-4 border rounded bg-white shadow">
           <h2 className="font-bold text-lg mb-2 text-gray-500">Feed Consumption Trend</h2>
           <FeedingChart feedings={pond.feedings}/>
         </div>
        }
        {pond.gradings && <div className="p-4 border rounded bg-white shadow ">
                            <h2 className="font-bold text-lg mb-2 text-gray-500">Weight Gain Trend</h2>
                            <GradingChart gradings={pond.gradings}/>
                          </div>}
      </div>
    </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
