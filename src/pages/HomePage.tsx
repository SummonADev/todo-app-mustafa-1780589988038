import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import TodoList from '@/components/TodoList';
import { CheckCircle } from 'lucide-react';

export default function HomePage() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <CheckCircle size={24} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
            <p className="text-sm text-gray-500">Stay organized, stay productive</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AddTodoForm onAdd={addTodo} />

        {stats.total > 0 && <StatsBar stats={stats} />}

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stats={stats}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        Data is saved in your browser's local storage.
      </footer>
    </div>
  );
}