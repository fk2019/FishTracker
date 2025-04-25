'use client';
import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    farmerName: '',
    farmName: '',
    preferredFeed: '',
    units: 'kg',
  });

  useEffect(() => {
    const stored = localStorage.getItem('settings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Settings</h1>

      <div className="space-y-4">
        <Input label="Farmer Name" name="farmerName" value={settings.farmerName} onChange={handleChange} />
        <Input label="Farm Name" name="farmName" value={settings.farmName} onChange={handleChange} />
        <Input label="Preferred Feed Type" name="preferredFeed" value={settings.preferredFeed} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium">Weight Units</label>
          <select
            name="units"
            value={settings.units}
            onChange={handleChange}
            className="mt-1 block w-full border p-2"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
          </select>
        </div>

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border p-2"
      />
    </div>
  );
}
