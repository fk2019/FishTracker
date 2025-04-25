"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MortalityChart({ entries }) {
  if (!entries || entries.length === 0) return null;

  // Sort by date ASC
  const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract labels and values
  const labels = sorted.map((entry) => entry.date);
  const dataPoints = sorted.map((entry) => entry.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Mortalities",
        data: dataPoints,
        fill: false,
        borderColor: "#f87171", // red-400
        backgroundColor: "#fecaca", // red-200
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#b91c1c", // red-800
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        title: {
          display: true,
          text: "Number of Dead Fish",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Mortality Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}
