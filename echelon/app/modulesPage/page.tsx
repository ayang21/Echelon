'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Quiz from '../Components/Quiz';
import StreakTracker from '../Components/StreakTracker';

type ModulePageProps = {
  params: { id: string };
};

export default function ModulePage({ params }: ModulePageProps) {
  const [moduleData, setModuleData] = useState<any>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Fetch module info from sampleData.json
    fetch('/data/sampleData.json')
      .then((res) => res.json())
      .then((data) => {
        const foundModule = data.modules.find((mod: any) => mod.id === params.id);
        setModuleData(foundModule);
      });

    // Fetch user progress
    fetch(`/api/progress/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProgress(data.completedVideos || []));
  }, [params.id]);

  const handleVideoComplete = (videoId: number) => {
    if (!progress.includes(videoId)) {
      const updatedProgress = [...progress, videoId];
      setProgress(updatedProgress);

      fetch(`/api/progress/${params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedVideos: updatedProgress }),
      });
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);

    fetch(`/api/progress/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizCompleted: true }),
    });
  };

  if (!moduleData) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading module...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <Link href="/modules">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
            Go Back
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Module: {moduleData.title}
      </h1>

      <StreakTracker days={5} />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Videos</h2>
        <ul>
          {moduleData.videos.map((video: any, index: number) => (
            <li key={video.id} className="mb-4">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVideoComplete(video.id)}
                className={`block w-full text-left p-4 border rounded-lg text-black ${
                  progress.includes(video.id)
                    ? 'bg-green-100 border-green-400'
                    : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {progress.length === moduleData.videos.length && !quizCompleted && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Quiz</h2>
          <Quiz
            question={moduleData.quiz[0].question}
            options={moduleData.quiz[0].options}
            correct={moduleData.quiz[0].correct}
          />
          <button
            onClick={handleQuizComplete}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Complete Quiz
          </button>
        </div>
      )}

      {quizCompleted && (
        <p className="text-green-600 font-bold text-lg mt-4">🎉 Quiz Completed!</p>
      )}
    </div>
  );
}
