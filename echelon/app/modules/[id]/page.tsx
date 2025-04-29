'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import Link from 'next/link';
import Quiz from '../../Components/Quiz';
import StreakTracker from '../../Components/StreakTracker';

export default function ModulePage({ params }: { params: { id: string } }) {
  const [moduleData, setModuleData] = useState<any>(null);
  const { progressState, updateProgress } = useProgress();
  const [quizResults, setQuizResults] = useState<boolean[]>([]); // Track quiz answers

  useEffect(() => {
    fetch('/Data/sampleData.json')
      .then((res) => res.json())
      .then((data) => {
        const thisModule = data.modules.find((mod: any) => mod.id === params.id);
        setModuleData(thisModule || null);
        setQuizResults(new Array(thisModule?.quiz.length || 0).fill(false)); // Initialize quiz results
      })
      .catch((err) => console.error('Failed to load module data:', err));
  }, [params.id]);

  const handleVideoComplete = (videoId: number) => {
    updateProgress(params.id, videoId);
  };

  const handleQuizAnswer = (index: number, isCorrect: boolean) => {
    const updatedResults = [...quizResults];
    updatedResults[index] = isCorrect;
    setQuizResults(updatedResults);
  };

  const handleQuizComplete = () => {
    if (quizResults.every((result) => result)) {
      updateProgress(params.id, undefined, true);
    } else {
      alert('Please answer all questions correctly before completing the quiz.');
    }
  };

  if (!moduleData) return <p className="text-center mt-10 text-gray-600">Loading module...</p>;

  const moduleProgress = progressState[params.id] || { completedVideos: [], quizCompleted: false };

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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
        <ul>
          {moduleData.videos.map((video: any) => (
            <li key={video.id} className="mb-4">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVideoComplete(video.id)}
                className={`block w-full text-left p-4 border rounded-lg text-black ${
                  moduleProgress.completedVideos.includes(video.id)
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

      {moduleProgress.completedVideos.length === moduleData.videos.length &&
        !moduleProgress.quizCompleted && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz</h2>
            {moduleData.quiz.map((quizItem: any, index: number) => (
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

      {moduleProgress.quizCompleted && (
        <p className="text-green-600 font-bold text-lg mt-4">🎉 Quiz Completed!</p>
      )}
    </div>
  );
}