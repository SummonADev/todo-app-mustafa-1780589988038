import { Search } from 'lucide-react';
import type { FilterType } from '../types/todo';

interface FilterBarProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  stats: { total: number; active: number; completed: number };
  onClearCompleted: () => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  stats,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line bg-card text-ink placeholder-ink-3 focus:outline-none focus:ring-2 focus:ring-acc focus:border-transparent transition-shadow shadow-sm text-sm"
        />
      </div>

      {/* Filters + Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 bg-subtle rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === f.value
                  ? 'bg-card text-acc shadow-sm'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              {f.label}
              <span className="ml-1 opacity-60">
                {f.value === 'all'
                  ? stats.total
                  : f.value === 'active'
                  ? stats.active
                  : stats.completed}
              </span>
            </button>
          ))}
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
          >
            Clear completed ({stats.completed})
          </button>
        )}
      </div>
    </div>
  );
}
