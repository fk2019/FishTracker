export function PondCard({ pond }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-blue-800 mb-1">{pond.name}</h2>
      <p className="text-sm text-gray-600">Size: {pond.size} m²</p>
      <p className="text-sm text-gray-600">Stocked: {pond.stockingDate}</p>
      <p className="text-sm text-gray-600">Fish: {pond.fishCount}</p>
      <p className={`text-sm mt-2 font-bold ${pond.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
        {pond.status === 'active' ? 'Active' : 'Inactive'}
      </p>
    </div>
  );
}
