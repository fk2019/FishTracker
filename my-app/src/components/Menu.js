// src/app/layout.js
'use client'
//import './globals.css';
import {useState } from 'react';
import {Sidebar} from './Sidebar';
import {useRouter} from 'next/navigation';

export function Menu() {
  const [isMenuOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isMenuOpen);
  }
  const handleLink = () => {
    isMenuOpen = false;
  }
  const router = useRouter();
  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
    router.push('/login');
};

  return (
      <div
    className={`p-5 text-gray-500 bg-blue-400 menu`}
      >
      <button className={` menu-button`}
    onClick={handleLogout}
      >
      ☰
    </button>
      <h1>Glider</h1>
      </div>
  );
}
