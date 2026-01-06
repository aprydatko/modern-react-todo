import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
// Import combineReducers to resolve type ambiguity between reducer object and single reducer function
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Removed deprecated PreloadedState import as it is no longer exported in recent Redux Toolkit versions
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import authReducer from '../store/authSlice';
import todoReducer from '../store/todoSlice';
import { RootState } from '../store';

// This custom render function allows us to inject specific initial states for tests
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    // Fix: Using combineReducers here ensures the 'reducer' property is passed as a function,
    // which correctly matches the expected Reducer type and avoids property existence errors on the object literal.
    store = configureStore({ 
      reducer: combineReducers({ auth: authReducer, todos: todoReducer }), 
      preloadedState: preloadedState as any 
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <HashRouter>
            {children}
          </HashRouter>
        </ThemeProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
