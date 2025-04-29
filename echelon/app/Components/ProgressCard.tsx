import Link from 'next/link';
import Dropdown from './Dropdown';

type Module = {
  id: string;
  title: string;
  description: string;
};

type Progress = {
  completedVideos: number[];
  quizCompleted: boolean;
};

export default function ProgressCard({ module, progress }: { module: Module; progress: Progress }) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-800">{module.title}</h2>
      <p className="text-gray-600 mt-2">{module.description}</p>
      <Dropdown title="View Module Progress">
        <p className="text-gray-600 mt-2">
          <strong>Videos Watched:</strong> {progress.completedVideos.length}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Quiz Completed:</strong> {progress.quizCompleted ? 'Yes' : 'No'}
        </p>
      </Dropdown>
      <Link href={`/modules/${module.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Module
        </button>
      </Link>
    </div>
  );
}