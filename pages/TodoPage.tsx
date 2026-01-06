
import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../store';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../store/todoSlice';
import TodoItem from '../components/TodoItem';
import { Plus, ListTodo, ClipboardList, Loader2, Sparkles } from 'lucide-react';

interface TodoFormInputs {
  title: string;
  description: string;
}

const TodoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items, loading, error } = useSelector((state: RootState) => state.todos);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormInputs>();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTodos(user.id));
    }
  }, [user?.id, dispatch]);

  const onAddTodo = (data: TodoFormInputs) => {
    if (user) {
      dispatch(addTodo({
        userId: user.id,
        title: data.title,
        description: data.description,
        completed: false,
      }));
      reset();
    }
  };

  const handleToggle = useCallback((id: string) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter(i => i.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [items]);

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700" data-testid="todo-page">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">Personal Dashboard</span>
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
            <ClipboardList className="text-blue-600" size={40} />
            My Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            You have <span className="text-blue-600 font-bold" data-testid="pending-count">{stats.pending}</span> pending tasks for today.
          </p>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-bold animate-pulse" data-testid="error-message">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-900 dark:text-white', tid: 'stat-total' },
          { label: 'Completed', value: stats.completed, color: 'text-green-600' },
          { label: 'Pending', value: stats.pending, color: 'text-orange-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow" data-testid={stat.tid}>
            <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Todo Input Form */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-700 transition-all group focus-within:ring-4 focus-within:ring-blue-500/10">
        <form onSubmit={handleSubmit(onAddTodo)} className="space-y-5" data-testid="todo-form">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                {...register('title', { required: 'Task title is required' })}
                placeholder="Type your task name..."
                data-testid="todo-input-title"
                className={`w-full px-5 py-4 text-lg font-semibold rounded-2xl border bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-gray-900 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 dark:border-gray-700 group-focus-within:border-blue-500'}`}
              />
              {errors.title && <span className="absolute -bottom-6 left-1 text-[11px] font-bold text-red-500 uppercase tracking-wide">{errors.title.message}</span>}
            </div>
            <button
              type="submit"
              data-testid="todo-submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center space-x-2 active:scale-95"
            >
              <Plus size={20} strokeWidth={3} />
              <span>Create Task</span>
            </button>
          </div>
          <textarea
            {...register('description')}
            rows={1}
            data-testid="todo-input-desc"
            placeholder="Description (optional)"
            className="w-full px-5 py-3 text-sm font-medium rounded-xl border border-gray-100 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white dark:focus:bg-gray-900 resize-none"
          />
        </form>
      </section>

      {/* Todo List */}
      <section className="space-y-4" data-testid="todo-list">
        {loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400" data-testid="loading-spinner">
            <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
            <p className="font-bold text-lg">Organizing your life...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Live Tasks</h2>
            </div>
            {items.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-gray-100/50 dark:bg-gray-800/20 rounded-[3rem] border-4 border-dashed border-gray-200 dark:border-gray-800" data-testid="empty-state">
            <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm flex items-center justify-center mb-6">
              <ListTodo size={40} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-white">All Clear!</h3>
            <p className="text-gray-500 dark:text-gray-500 font-medium mt-1">Enjoy your day or start a new project.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TodoPage;
