'use client';
import { useRouter} from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with:', email, password);
    // Add actual signup logic later
  };
  const router = useRouter();
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/ponds');


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-green-600 underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
