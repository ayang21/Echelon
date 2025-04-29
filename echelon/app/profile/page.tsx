"use client";
import { useEffect, useState } from 'react';
import ProgressCard from '../Components/ProgressCard';
import Link from 'next/link';

export default function UserProfile() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/sampleData.json')
      .then((res) => res.json())
      .then((data) => {
        setModules(data.modules || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load modules:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading modules...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <Link href="/">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
            Go Back
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ProgressCard key={module["id"]} module={module} />
        ))}
      </div>
    </div>
  );
}
