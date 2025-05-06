// src/app/layout.js
'use client'
//import './globals.css';
import {useState } from 'react';
import {Sidebar} from './Sidebar';

export function Menu() {
  const [isMenuOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isMenuOpen);
  }
  const handleLink = () => {
    isMenuOpen = false;
  }
  return (
      <div
    className={`p-5 text-gray-500 bg-blue-400 menu`}
      >
      <button className={`menu-button`}
    onClick={toggle}
      >
      ☰
    </button>
      <Sidebar isMenuOpen={isMenuOpen} linkClick={handleLink} />
      <h1>True:{isMenuOpen ? 'true' : 'false'}</h1>
      </div>
  );
}
