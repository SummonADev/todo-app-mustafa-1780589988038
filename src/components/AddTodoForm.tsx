import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { TodoCategory } from '../types/todo';
import { categoryOptions, categoryConfig } from '../lib/categories';

interface AddTodoFormProps {
  onAdd: (text: string, category: TodoCategory) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-1.5 font-medium"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
      {isExpanded && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat
                  ? `${categoryConfig[cat].bg} ${categoryConfig[cat].color} ring-2 ring-offset-1 ring-indigo-400`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {categoryConfig[cat].label}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
