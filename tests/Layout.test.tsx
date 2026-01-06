
import React from 'react';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from '@jest/globals';
import Layout from '../components/Layout';
import authReducer from '../store/authSlice';
import todoReducer from '../store/todoSlice';
import { ThemeProvider } from '../context/ThemeContext';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
  preloadedState: {
    auth: {
      user: { id: '1', name: 'Test User', email: 'test@test.com', avatar: '' },
      token: 'fake',
      loading: false,
      error: null
    }
  }
});

describe('Layout Snapshot', () => {
  it('renders correctly with logged in user', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeProvider>
          <HashRouter>
            <Layout />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
