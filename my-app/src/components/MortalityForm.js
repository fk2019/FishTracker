'use client';
import React, { useState } from 'react';

export default function MortalityForm({ onAddEntry }) {
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !number) return;

    const newEntry = { date, number: parseInt(number) };
    onAddEntry(newEntry);
    setDate('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
      <input
        type="date"
        className="border px-2 py-1 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of deaths"
        className="border px-2 py-1 rounded"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-1 rounded">
        Add
      </button>
    </form>
  );
}
