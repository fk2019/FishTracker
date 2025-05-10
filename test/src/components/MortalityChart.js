import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function MortalityLineChart({ mortalities }) {
  if (!Array.isArray(mortalities)) return <p className="no-record">No mortality data</p>;

  const data = {
    labels: mortalities.map(h => `${h.date}`),
    datasets: [
      {
        label: 'Count',
        data: mortalities.map(h => h.count),
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
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Mortality Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}
