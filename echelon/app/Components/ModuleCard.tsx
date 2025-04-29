import Link from 'next/link';

type Module = {
  id: string;
  title: string;
  description: string;
};

export default function ModuleCard({ module }: { module: Module }) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-800">{module.title}</h2>
      <p className="text-gray-600 mt-2">{module.description}</p>
      <Link href={`/modules/${module.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Start Module
        </button>
      </Link>
    </div>
  );
}
