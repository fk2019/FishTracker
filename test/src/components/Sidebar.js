// src/components/Sidebar.js
'use client'
import {useState} from 'react';
import Link from 'next/link';

export function Sidebar({MenuOpen, linkClick}) {
  let isMenuOpen = true;
  return (
      <aside className={`bg-blue-800 text-white min-h-screen p-6 width ${
isMenuOpen ? 'w-screen': '0'} sm ${isMenuOpen ? 'w-96': '0'}  md:w-auto`}>
      <h1>{isMenuOpen ? 'true' : 'false'}</h1>
      <h2 className="text-2xl font-bold mb-8">🐟 FishFarm</h2>
      <nav className="flex flex-col space-y-4">
      <Link href="/" onClick={linkClick}className="hover:text-blue-200 transition">Dashboard</Link>
        <Link href="/ponds" className="hover:text-blue-200 transition">Pond Management</Link>
      <Link href="/logs" className="hover:text-blue-200 transition">Feeding Log</Link>
      <Link href="/logs/mortality" className="hover:text-blue-200 transition">Mortality Log</Link>
      <Link href="/grading" className="hover:text-blue-200 transition">Grading</Link>
      <Link href="/harvesting" className="hover:text-blue-200 transition">Harvesting</Link>
        <Link href="/reports" className="hover:text-blue-200 transition">Reports</Link>
        <Link href="/settings" className="hover:text-blue-200 transition">Settings</Link>
      </nav>
      </aside>
  );
}
