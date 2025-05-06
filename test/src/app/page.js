'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import './globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  {/* const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);
   */}
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
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Get Started</Link>
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
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simplify Your Fish Farm Record Keeping</h2>
        <p className="text-lg sm:text-xl max-w-xl mb-6">Manage feeding, track mortality, and streamline your operations all from one simple, intuitive platform.</p>
        <Link href="/signup" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition">Start for Free</Link>

        {/* Video Walkthrough Placeholder */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Walkthrough Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} FishFarm. All rights reserved.
      </footer>
    </main>
  );
}
