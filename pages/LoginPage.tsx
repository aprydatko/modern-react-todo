
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { loginUser } from '../store/authSlice';
import { AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormInputs {
  email: string;
  pass: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const from = (location.state as any)?.from?.pathname || '/todos';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your productivity</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            type="email"
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="name@example.com"
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
          <input
            {...register('pass', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
            type="password"
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 ${errors.pass ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="••••••••"
          />
          {errors.pass && <span className="text-xs text-red-500 mt-1">{errors.pass.message}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : null}
          <span>{loading ? 'Logging in...' : 'Sign In'}</span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Don't have an account? {' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">Sign Up Free</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
