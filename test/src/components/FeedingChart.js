import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function FeedLineChart({ feedings }) {
  if (!Array.isArray(feedings)) return <p>No feed data</p>;

  const data = {
    labels: feedings.map(h => `${h.date}`),
    datasets: [
      {
        label: 'Amount',
        data: feedings.map(h => h.weight),
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
    <div className="mt-10 bg-white">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Feed History</h2>
      <Line data={data} options={options} />
    </div>
  );
}
