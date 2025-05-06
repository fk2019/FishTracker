import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function GradingLineChart({ gradings }) {
  if (!Array.isArray(gradings)) return <p>No grading data</p>;

  const data = {
    labels: gradings.map(h => `#${h.gradingNumber}`),
    datasets: [
      {
        label: 'Count',
        data: gradings.map(h => h.count),
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
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Grading History</h2>
      <Line data={data} options={options} />
    </div>
  );
}
