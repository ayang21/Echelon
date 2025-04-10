import ModuleCard from '../Components/ModuleCard';

const modules = [
  { id: '1', title: 'Basics of Investing', description: 'Learn the fundamentals of investing.' },
  { id: '2', title: 'Advanced Investing Strategies', description: 'Dive deeper into advanced strategies.' },
  { id: '3', title: 'Risk Management', description: 'Understand and manage investment risks.' },
];

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}