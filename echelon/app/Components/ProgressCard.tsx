import Link from 'next/link';
import { useState } from 'react';
import Dropdown from './Dropdown';

type Module = {
  id: string;
  title: string;
  description: string;
  videos: { id: number; title: string; url: string; progress: boolean }[];
  quiz: { id: number; question: string; options: string[]; correct: number }[];
};

export default function ProgressCard({ module }: { module: Module }) {

  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-800">{module.title}</h2>
      <p className="text-gray-600 mt-2">{module.description}</p>
      <Dropdown title="View Module Progress">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
        <ul>
          {module.videos.map((video, index) => (
            <li key={video.id} className="mb-4">
              <a
  
  className={`block w-full text-left p-4 border rounded-lg text-black ${
    module.id == "1"
      ? 'bg-green-100 border-green-400'
      : 'bg-white border-gray-300'
  }`}
>
  {video.title}
</a>

            </li>
          ))}
        </ul>
      </div>
      <p
  hidden={module.id !== "1"} // Pass the boolean result directly
  className="text-gray-600 mt-2"
><strong>Quiz Complete:</strong> Yes!
              </p>
      </Dropdown>
      
    </div>
  );
}