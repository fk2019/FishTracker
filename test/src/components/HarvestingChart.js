import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function HarvestLineChart({ harvests }) {
  if (!Array.isArray(harvests)) return <p className="no-record">No harvest data</p>;

  const data = {
    labels: harvests.map(h => `${h.date}`),
    datasets: [
      {
        label: 'Count',
        data: harvests.map(h => h.count),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.2,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="mt-10 bg-white chart">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Harvest Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}
