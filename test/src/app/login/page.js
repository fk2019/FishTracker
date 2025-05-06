'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
     <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-6 shadow-md bg-white"
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">FishFarm</h1>
          <div className="space-x-4">
         <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Home</Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-4"
      >

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">Login</h1>
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">Login</button>
        <p className="text-sm text-center">No account? <a href="/signup" className="text-blue-600">Sign up</a></p>
      </form>

      </motion.section>

      <footer className="p-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} FishFarm. All rights reserved.
      </footer>
    </main>
  );
}
