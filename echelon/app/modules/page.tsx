'use client';

import { useState } from 'react';
import Link from 'next/link';
import ModuleCard from '../Components/ModuleCard';

const modules = [
  { id: 1, title: 'Step 1: Welcome to Investing', description: 'Learn the basics of investing and why it matters.' },
  { id: 2, title: 'Step 2: Where to Invest', description: 'Explore different investment options and strategies.' },
  { id: 3, title: 'Step 3: Building Your Portfolio', description: 'Learn how to create and manage your investment portfolio.' },
  { id: 4, title: 'Step 4: Risk Management', description: 'Understand the risks involved in investing and how to mitigate them.' },
  { id: 5, title: 'Step 5: Advanced Strategies', description: 'Dive into advanced investment strategies and techniques.' },
];

export default function ModulesPage() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <Link href="/">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
            Go Back
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Investing Modules</h1>

      {/* Dropdown for Steps */}
      <div className="mb-6 text-center">
        <label htmlFor="step-select" className="block text-lg font-medium text-gray-700 mb-2">
          Select a Step:
        </label>
        <select
          id="step-select"
          value={selectedStep ?? ''}
          onChange={(e) => setSelectedStep(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Choose a step
          </option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.title}
            </option>
          ))}
        </select>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules
          .filter((module) => (selectedStep === null ? true : module.id === selectedStep))
          .map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
      </div>
    </div>
  );
}