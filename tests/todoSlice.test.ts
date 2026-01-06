
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import todoReducer, { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../store/todoSlice';
import { Todo, TodoState } from '../types';

describe('Todo Slice & Thunks', () => {
  const initialState: TodoState = {
    items: [],
    loading: false,
    error: null,
  };

  const mockTodo: Todo = {
    id: 'todo-1',
    userId: 'user-1',
    title: 'Test Task',
    description: 'Test Desc',
    completed: false,
    createdAt: new Date().toISOString()
  };

  it('should handle fetchTodos.fulfilled', () => {
    const todos = [mockTodo];
    const action = { type: fetchTodos.fulfilled.type, payload: todos };
    const state = todoReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(todos);
  });

  // NEW: Error handling test
  it('should handle fetchTodos.rejected', () => {
    const errorMsg = "Failed to load tasks";
    const action = { type: fetchTodos.rejected.type, error: { message: errorMsg } };
    const state = todoReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMsg);
  });

  it('should handle addTodo.fulfilled by prepending to items', () => {
    const existingState: TodoState = {
      ...initialState,
      items: [mockTodo]
    };
    const newTodo: Todo = { ...mockTodo, id: 'todo-2', title: 'New task' };
    const action = { type: addTodo.fulfilled.type, payload: newTodo };
    const state = todoReducer(existingState, action);

    expect(state.items.length).toBe(2);
    expect(state.items[0]).toEqual(newTodo);
  });

  it('should handle toggleTodo.fulfilled', () => {
    const existingState: TodoState = {
      ...initialState,
      items: [mockTodo]
    };
    const updatedTodo = { ...mockTodo, completed: true };
    const action = { type: toggleTodo.fulfilled.type, payload: updatedTodo };
    const state = todoReducer(existingState, action);

    expect(state.items[0].completed).toBe(true);
  });

  it('should handle deleteTodo.fulfilled', () => {
    const existingState: TodoState = {
      ...initialState,
      items: [mockTodo]
    };
    const action = { type: deleteTodo.fulfilled.type, payload: mockTodo.id };
    const state = todoReducer(existingState, action);

    expect(state.items).toHaveLength(0);
  });

  it('should set loading true on fetchTodos.pending', () => {
    const action = { type: fetchTodos.pending.type };
    const state = todoReducer(initialState, action);
    expect(state.loading).toBe(true);
  });
});
