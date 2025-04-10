'use client';

import { useState } from 'react';
import Link from 'next/link';
import Quiz from '../../Components/Quiz';

const videos = [
  { id: 1, title: 'Introduction to Investing', url: 'https://www.youtube.com/watch?v=example1' },
  { id: 2, title: 'Why Investing Matters', url: 'https://www.youtube.com/watch?v=example2' },
  { id: 3, title: 'Types of Investments', url: 'https://www.youtube.com/watch?v=example3' },
];

const quizzes = [
  {
    id: 1,
    question: 'What is the primary goal of investing?',
    options: ['To lose money', 'To grow wealth', 'To avoid taxes', 'To save money'],
    correct: 1,
  },
];

export default function Module1Page() {
  const [progress, setProgress] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleVideoComplete = (videoId: number) => {
    if (!progress.includes(videoId)) {
      setProgress([...progress, videoId]);
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
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
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Module: Basics of Investing</h1>
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
      {progress.length === videos.length && !quizCompleted && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz</h2>
          <Quiz
            question={quizzes[0].question}
            options={quizzes[0].options}
            correct={quizzes[0].correct}
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