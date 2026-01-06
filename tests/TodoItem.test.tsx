
/* 
  NOTE: This file is for demonstration of how to write tests in a React/TypeScript production environment.
  In a real environment, you would run 'npm test' or 'jest'.
*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// Fix: Import test globals to satisfy TypeScript compiler and fix "Cannot find name" errors
import { describe, it, expect, jest } from '@jest/globals';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types';

const mockTodo: Todo = {
  id: '1',
  userId: 'user-1',
  title: 'Learn React Testing',
  description: 'Understand RTL and Jest',
  completed: false,
  createdAt: new Date().toISOString()
};

describe('TodoItem Component', () => {
  // Fix: Explicitly typed mock functions for clarity
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  // Snapshot Test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle as any} onDelete={mockOnDelete as any} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // Unit Test: Rendering
  it('renders todo title and description', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle as any} onDelete={mockOnDelete as any} />);
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
    expect(screen.getByText('Understand RTL and Jest')).toBeInTheDocument();
  });

  // Integration Test: Interactions
  it('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle as any} onDelete={mockOnDelete as any} />);
    const checkbox = screen.getByRole('button', { name: /delete/i }).parentElement?.querySelector('button');
    if (checkbox) fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle as any} onDelete={mockOnDelete as any} />);
    const deleteBtn = screen.getByLabelText('Delete Todo');
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
