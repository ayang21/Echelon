export default function StreakTracker({ days }: { days: number }) {
    return (
      <div className="text-center my-4 text-black">
        🔥 Streak: <span className="font-bold">{days}</span> day{days !== 1 ? 's' : ''}
      </div>
    );
  }
  