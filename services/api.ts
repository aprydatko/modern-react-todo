
import { User, Todo } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Using local storage to persist mock data for the current session
const getStoredTodos = (): Todo[] => {
  const stored = localStorage.getItem('mock_todos');
  return stored ? JSON.parse(stored) : [];
};

const saveStoredTodos = (todos: Todo[]) => {
  localStorage.setItem('mock_todos', JSON.stringify(todos));
};

export const mockLogin = async (email: string, pass: string) => {
  await delay(800);
  if (email && pass.length >= 6) {
    return {
      token: 'fake-jwt-token-' + Date.now(),
      user: { id: 'user-1', email, name: email.split('@')[0], avatar: 'https://picsum.photos/seed/user1/100' }
    };
  }
  throw new Error('Invalid credentials. Password must be at least 6 characters.');
};

export const mockGetTodos = async (userId: string): Promise<Todo[]> => {
  await delay(500);
  return getStoredTodos().filter(t => t.userId === userId);
};

export const mockCreateTodo = async (todoData: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
  await delay(400);
  const newTodo: Todo = {
    ...todoData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  const current = getStoredTodos();
  saveStoredTodos([newTodo, ...current]);
  return newTodo;
};

export const mockToggleTodo = async (id: string): Promise<Todo> => {
  await delay(300);
  const current = getStoredTodos();
  const todoIndex = current.findIndex(t => t.id === id);
  if (todoIndex === -1) throw new Error('Todo not found');
  
  current[todoIndex].completed = !current[todoIndex].completed;
  saveStoredTodos(current);
  return current[todoIndex];
};

export const mockDeleteTodo = async (id: string): Promise<void> => {
  await delay(300);
  const current = getStoredTodos();
  const filtered = current.filter(t => t.id !== id);
  saveStoredTodos(filtered);
};
