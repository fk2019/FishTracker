// src/app/layout.js
import './globals.css';
import { Sidebar } from '../components/Sidebar';

export const metadata = {
  title: 'FishFarm Dashboard',
  description: 'Aquaculture Record Keeping Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-blue-50">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
