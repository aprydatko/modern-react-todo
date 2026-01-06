
import React from 'react';
import { Todo } from '../types';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, onToggle, onDelete }) => {
  const dateStr = new Date(todo.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className={`group flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 
      ${todo.completed 
        ? 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 opacity-60' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 shadow-sm hover:shadow-md'}`}>
      
      <div className="flex items-center space-x-5 flex-1">
        <button 
          onClick={() => onToggle(todo.id)}
          className={`focus:outline-none transition-all active:scale-75 ${todo.completed ? 'text-green-500' : 'text-gray-300 dark:text-gray-600 hover:text-blue-500'}`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? <CheckCircle size={28} strokeWidth={2.5} /> : <Circle size={28} strokeWidth={2} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-lg truncate leading-tight ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {todo.title}
            </h3>
            <span className="flex items-center gap-1 text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-tighter shrink-0">
              <Clock size={10} /> {dateStr}
            </span>
          </div>
          {todo.description && (
            <p className={`text-sm mt-0.5 truncate font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-3 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
        aria-label="Delete Todo"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
