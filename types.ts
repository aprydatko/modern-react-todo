
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}
