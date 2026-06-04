import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

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
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10 pb-10 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">✅ My Todos</h1>
          <p className="text-sm text-gray-500 mt-1">Stay organised, get things done.</p>
        </div>

        <StatsBar stats={stats} />

        <div className="bg-white rounded-2xl shadow-md p-6">
          <AddTodoForm onAdd={addTodo} />

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
        </div>
      </div>
    </div>
  );
}
