import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Echelon</h1>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center text-center px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 max-w-2xl">
          Level Up Your Financial Game
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-xl">
          Echelon is a financial literacy app built for student-athletes. Learn to manage NIL deals, budget your money, and invest in your future—all in just a few minutes a day.
        </p>
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <Link href="/modules">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Explore Modules
            </button>
          </Link>
          <Link href="/profile">
            <button className="bg-white border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              View Your Progress
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Echelon • Made for student-athletes, by student-athletes
      </footer>
    </div>
  );
}