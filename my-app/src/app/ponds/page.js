'use client'; // Add this to indicate that this is a client-side component
import { useState } from 'react';
import { PondCard } from '../../components/PondCard';
import { Modal } from '../../components/Modal';

const dummyPonds = [
  {
    name: 'Pond 1',
    size: 120,
    stockingDate: '2025-03-10',
    fishCount: 1200,
    status: 'active',
  },
  {
    name: 'Pond 2',
    size: 95,
    stockingDate: '2025-02-21',
    fishCount: 950,
    status: 'inactive',
  },
];

export default function PondsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ponds, setPonds] = useState(dummyPonds);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPond = (newPond) => {
    setPonds([...ponds, newPond]);
  };

  //const pondMortalities = ponds.filter((entry) ==> entry.name === name);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-900">Pond Management</h1>
        <button
          onClick={openModal}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          + Add Pond
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ponds.map((pond, idx) => (
          <PondCard key={idx} pond={pond} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} onSubmit={handleAddPond} />
      </div>
  );
}
