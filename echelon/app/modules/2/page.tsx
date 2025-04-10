'use client';

import { useState } from 'react';
import Link from 'next/link';

const videos = [
  { id: 1, title: 'Understanding Advanced Strategies', url: 'https://www.youtube.com/watch?v=example4' },
  { id: 2, title: 'Diversification Techniques', url: 'https://www.youtube.com/watch?v=example5' },
  { id: 3, title: 'Risk-Reward Analysis', url: 'https://www.youtube.com/watch?v=example6' },
];

export default function Module2Page() {
  const [progress, setProgress] = useState<number[]>([]);

  const handleVideoComplete = (videoId: number) => {
    if (!progress.includes(videoId)) {
      setProgress([...progress, videoId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <Link href="/modules">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
            Go Back
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Module: Advanced Investing Strategies</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
        <ul>
          {videos.map((video, index) => (
            <li key={video.id} className="mb-4">
              <button
                onClick={() => handleVideoComplete(video.id)}
                disabled={index > 0 && !progress.includes(videos[index - 1].id)}
                className={`block w-full text-left p-4 border rounded-lg ${
                  progress.includes(video.id) ? 'bg-green-100' : 'bg-white'
                }`}
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}