// src/components/Sidebar.js
'use client'
import {useState} from 'react';
import Link from 'next/link';
import AuthWrapper from './AuthWrapper';
export function Sidebar({MenuOpen, linkClick}) {

  return (
    <AuthWrapper>
      <aside className={`bg-blue-800 text-white min-h-screen p-6 visible ${MenuOpen ? 'visible' : 'hidden'}
 visible md: visible`}>
      <h2 className="text-2xl font-bold mb-8"> <div className="fish">🐟</div> FishFarm</h2>
      <nav className="flex flex-col space-y-4">
      <Link href="/login" className="hover:text-blue-200 transition">Login</Link>
      <Link href="/dash" className="hover:text-blue-200 transition">Dashboard</Link>
        <Link href="/ponds" className="hover:text-blue-200 transition">Pond</Link>
      <Link href="/logs" className="hover:text-blue-200 transition">Feeding</Link>
      <Link href="/logs/mortality" className="hover:text-blue-200 transition">Mortality</Link>
      <Link href="/grading" className="hover:text-blue-200 transition">Grading</Link>
      <Link href="/harvesting" className="hover:text-blue-200 transition">Harvesting</Link>
        <Link href="/reports" className="hover:text-blue-200 transition">Reports</Link>
        <Link href="/settings" className="hover:text-blue-200 transition">Settings</Link>
      </nav>
      </aside>
      </AuthWrapper>
  );
}
