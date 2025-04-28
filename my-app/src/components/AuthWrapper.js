'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}
