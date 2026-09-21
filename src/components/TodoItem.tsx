import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import type { Todo } from '../types/todo';
import { categoryConfig } from '../lib/categories';

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
      className={`group flex items-center gap-3 p-4 rounded-xl bg-card border border-line shadow-sm hover:shadow-md transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-acc border-acc'
            : 'border-ink-3 hover:border-acc'
        }`}
      >
        {todo.completed && <Check size={14} className="text-acc-ink" />}
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
            className="w-full px-2 py-1 rounded-lg border border-line bg-card text-ink focus:outline-none focus:ring-2 focus:ring-acc"
          />
        ) : (
          <div>
            <p
              className={`text-sm sm:text-base ${
                todo.completed ? 'line-through text-ink-3' : 'text-ink'
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
              <span className="text-[10px] text-ink-3">
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
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-400/10 transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-ink-3 hover:bg-subtle transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-ink-3 hover:bg-subtle hover:text-acc transition-colors"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-ink-3 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-400/10 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
