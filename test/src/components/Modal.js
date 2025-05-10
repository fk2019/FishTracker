import { useState } from 'react';

export function Modal({ isOpen, closeModal, onSubmit }) {
  const [pondData, setPondData] = useState({
    name: '',
    size: '',
    stockingDate: '',
    fishStocked: '',
    status: 'active',
  });

  if (!isOpen) return null;
  const ponds = JSON.parse(localStorage.getItem('ponds') || '[]');
  const handleChange = (e) => {
    setPondData({ ...pondData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ponds.find(pond =>pond.name === pondData.name && pond.status === 'active')) {
      alert(`${pondData.name} is still active`)
    } else {
      const updatedPondData = {
        ...pondData,
        volume: pondData.size*1,
      };
      ponds.push(updatedPondData);
      localStorage.setItem('ponds', JSON.stringify(ponds));
      localStorage.setItem('pond', JSON.stringify(updatedPondData));
      onSubmit(updatedPondData);
      closeModal();
    }

  };

  return (
      <div className="modal fixed inset-0  bg-opacity-90 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Add New Pond</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Pond Name</label>
      <input
    type="text"
    name="name"
    value={pondData.name}
    onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
    required
      />
      </div>

      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Size (m²)</label>
      <input
    type="number"
    name="size"
    value={pondData.size}
    onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
    required
    placeholder="Enter area in m²"
      />
      </div>

      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Stocking Date</label>
      <input
    type="date"
              name="stockingDate"
    value={pondData.stockingDate}
    onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
              required
      />
      </div>

      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Number of Fish</label>
      <input
    type="number"
    name="fishStocked"
    value={pondData.fishStocked}
    onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
    required
      />
      </div>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Species</label>
      <input
    type="text"
    name="species"
    value={pondData.species}
    onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
    required
      />
          </div>

      <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
      <select
    name="status"
    value={pondData.status}
              onChange={handleChange}
    className="w-full p-2 border border-blue-300 rounded text-sm text-blue-500"
      >
              <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      </select>
      </div>

      <div className="flex justify-end">
      <button
    type="button"
    onClick={closeModal}
    className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
      >
      Cancel
    </button>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
      Save Pond
    </button>
      </div>
      </form>
      </div>
      </div>
  );
}
