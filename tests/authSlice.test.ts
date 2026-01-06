
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import authReducer, { loginUser, logout } from '../store/authSlice';
import * as api from '../services/api';
import { AuthState } from '../types';

// Mock the API service
jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Auth Slice & Thunks', () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      ...initialState,
      user: null, // Depending on localStorage mock
      token: null
    });
  });

  it('should handle logout', () => {
    const loggedInState: AuthState = {
      user: { id: '1', name: 'Test', email: 't@t.com' },
      token: 'token123',
      loading: false,
      error: null
    };
    const state = authReducer(loggedInState, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  describe('loginUser thunk', () => {
    it('should set loading to true when login is pending', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should update state on successful login (fulfilled)', () => {
      const mockPayload = {
        token: 'fake-jwt',
        user: { id: '1', name: 'Admin', email: 'admin@pro.com' }
      };
      const action = { type: loginUser.fulfilled.type, payload: mockPayload };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockPayload.user);
      expect(state.token).toBe(mockPayload.token);
    });

    it('should set error message on failed login (rejected)', () => {
      const errorMessage = 'Invalid credentials';
      const action = { type: loginUser.rejected.type, payload: errorMessage };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });
});
