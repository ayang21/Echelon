'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Quiz from '../../Components/Quiz';

export default function Module1Page() {
  const [moduleData, setModuleData] = useState<any>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch('/data/sampleData.json')
      .then((res) => res.json())
      .then((data) => {
        const thisModule = data.modules.find((mod: any) => mod.id === '1');
        setModuleData(thisModule);
      })
      .catch((err) => console.error('Failed to load module data:', err));
  }, []);

  const handleVideoComplete = (videoId: number) => {
    if (!progress.includes(videoId)) {
      setProgress([...progress, videoId]);
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  if (!moduleData) return <p className="text-center mt-10 text-gray-600">Loading module...</p>;

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

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
        <ul>
          {moduleData.videos.map((video: any, index: number) => (
            <li key={video.id} className="mb-4">
              <button
                onClick={() => handleVideoComplete(video.id)}
                disabled={index > 0 && !progress.includes(moduleData.videos[index - 1].id)}
                className={`block w-full text-left p-4 border rounded-lg text-gray-800 ${
                  progress.includes(video.id) ? 'bg-green-100' : 'bg-white'
                }`}
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {progress.length === moduleData.videos.length && !quizCompleted && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz</h2>
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

      {quizCompleted && <p className="text-green-600 font-bold">🎉 Quiz Completed!</p>}
    </div>
  );
}
