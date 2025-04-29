'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Quiz from '../../Components/Quiz';
import StreakTracker from '../../Components/StreakTracker';

type Module = {
  id: string;
  title: string;
  description: string;
  videos: { id: number; title: string; url: string }[];
  quiz: { id: number; question: string; options: string[]; correct: number }[];
};

export default function ModulePage({ params }: { params: { id: string } }) {
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);

  useEffect(() => {
    fetch('/Data/sampleData.json')
      .then((res) => res.json())
      .then((data) => {
        const thisModule = data.modules.find((mod: Module) => mod.id === params.id);
        setModuleData(thisModule || null);
        setQuizResults(new Array(thisModule?.quiz.length || 0).fill(false));
      })
      .catch((err) => console.error('Failed to load module data:', err));
  }, [params.id]);

  const handleVideoComplete = (videoId: number) => {
    if (!progress.includes(videoId)) {
      setProgress([...progress, videoId]);
    }
  };

  const handleQuizAnswer = (index: number, isCorrect: boolean) => {
    const updatedResults = [...quizResults];
    updatedResults[index] = isCorrect;
    setQuizResults(updatedResults);
  };

  const handleQuizComplete = () => {
    if (quizResults.every((result) => result)) {
      setQuizCompleted(true);
    } else {
      alert('Please answer all questions correctly before completing the quiz.');
    }
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
      <p className="text-center text-gray-600 mb-6">{moduleData.description}</p>

      <StreakTracker days={5} />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
        <ul>
          {moduleData.videos.map((video, index) => (
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz</h2>
          {moduleData.quiz.map((quizItem: Module['quiz'][0], index: number) => (
            <Quiz
              key={quizItem.id}
              question={quizItem.question}
              options={quizItem.options}
              correct={quizItem.correct}
              onAnswer={(isCorrect: boolean) => handleQuizAnswer(index, isCorrect)}
            />
          ))}
          <button
            onClick={handleQuizComplete}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Complete Quiz
          </button>
        </div>
      )}

      {quizCompleted && quizResults.every((result) => result) && (
        <p className="text-green-600 font-bold text-lg mt-4">🎉 Quiz Completed!</p>
      )}
    </div>
  );
}