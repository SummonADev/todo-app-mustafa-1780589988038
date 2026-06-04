interface StatsBarProps {
  stats: { total: number; active: number; completed: number };
}

export default function StatsBar({ stats }: StatsBarProps) {
  const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-90">Progress</span>
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs opacity-80">
        <span>{stats.active} remaining</span>
        <span>{stats.completed} completed</span>
      </div>
    </div>
  );
}