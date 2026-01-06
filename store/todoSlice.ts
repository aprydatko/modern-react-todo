
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types';
import * as api from '../services/api';

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchAll', async (userId: string) => {
  return await api.mockGetTodos(userId);
});

export const addTodo = createAsyncThunk('todos/add', async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
  return await api.mockCreateTodo(todo);
});

export const toggleTodo = createAsyncThunk('todos/toggle', async (id: string) => {
  return await api.mockToggleTodo(id);
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id: string) => {
  await api.mockDeleteTodo(id);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find(t => t.id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
