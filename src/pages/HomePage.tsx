import AddTodoForm from '../components/AddTodoForm';
import FilterBar from '../components/FilterBar';
import StatsBar from '../components/StatsBar';
import ThemePicker from '../components/ThemePicker';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';

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
    <div className="min-h-screen bg-page flex items-start justify-center pt-10 pb-10 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-acc tracking-tight">
              ✅ My Todos
            </h1>
            <p className="text-sm text-ink-2 mt-1">Stay organised, get things done.</p>
          </div>
          <ThemePicker />
        </div>

        <StatsBar stats={stats} />

        <div className="bg-card rounded-2xl shadow-md p-6">
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
