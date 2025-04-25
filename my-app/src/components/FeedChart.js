import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FeedChart = ({ entries }) => {
  const chartData = {
    labels: entries.map((entry) => entry.date),
    datasets: [
      {
        label: 'Feed Consumption (kg)',
        data: entries.map((entry) => entry.quantity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};
export default FeedChart;
