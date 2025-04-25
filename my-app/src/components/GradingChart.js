import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GradingChart = ({ entries }) => {
  // Sort entries by date in ascending order (oldest to newest)
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Group entries by date, and for each date, gather distinct weights for each pond
  const groupedEntries = sortedEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, ponds: { 'Pond A': [], 'Pond B': [], 'Pond C': [] } };
    }
    acc[date].ponds[entry.pond].push(entry.averageWeight);
    return acc;
  }, {});

  // Prepare the data for the chart
  const labels = Object.keys(groupedEntries); // Dates (unique)

  const pondAData = labels.map(date => {
    const data = groupedEntries[date].ponds['Pond A'];
    return data.length > 0 ? data : [0]; // If no data, return 0
  });

  const pondBData = labels.map(date => {
    const data = groupedEntries[date].ponds['Pond B'];
    return data.length > 0 ? data : [0];
  });

  const pondCData = labels.map(date => {
    const data = groupedEntries[date].ponds['Pond C'];
    return data.length > 0 ? data : [0];
  });

  // Flatten the data arrays for chart display (since multiple weights per date can exist)
  const flattenedPondAData = pondAData.flat();
  const flattenedPondBData = pondBData.flat();
  const flattenedPondCData = pondCData.flat();

  // Prepare the data structure for the chart
  const data = {
    labels: labels, // X-axis (dates)
    datasets: [
      {
        label: 'Pond A',
        data: flattenedPondAData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Pond B',
        data: flattenedPondBData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Pond C',
        data: flattenedPondCData,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Growth Trends</h3>
      <Line data={data} />
    </div>
  );
};

export default GradingChart;
