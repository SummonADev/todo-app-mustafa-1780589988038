import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import type { Todo } from '@/types/todo';
import { categoryConfig } from '@/lib/categories';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const config = categoryConfig[todo.category];

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-indigo-600 border-indigo-600'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        ) : (
          <div>
            <p
              className={`text-sm sm:text-base ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${config.bg} ${config.color}`}
              >
                {config.label}
              </span>
              <span className="text-[10px] text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}