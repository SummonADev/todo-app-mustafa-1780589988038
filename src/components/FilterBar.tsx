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
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm text-sm"
        />
      </div>

      {/* Filters + Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === f.value
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
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
            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear completed ({stats.completed})
          </button>
        )}
      </div>
    </div>
  );
}
