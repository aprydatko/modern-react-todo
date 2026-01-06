
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loginUser } from '../store/authSlice';
import { Loader2, UserPlus } from 'lucide-react';

interface RegisterFormInputs {
  name: string;
  email: string;
  pass: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/todos', { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterFormInputs) => {
    await dispatch(loginUser({ email: data.email, pass: data.pass }));
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 text-blue-600">
          <UserPlus size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Join ProTodo to stay organized and productive</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
          <input 
            {...register('name', { required: 'Name is required' })} 
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="John Doe"
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
          <input 
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } 
            })} 
            type="email" 
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="name@example.com"
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
          <input 
            {...register('pass', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Minimum 6 characters' } 
            })} 
            type="password" 
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 ${errors.pass ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder="••••••••"
          />
          {errors.pass && <span className="text-xs text-red-500 mt-1">{errors.pass.message}</span>}
        </div>

        <button 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : null}
          <span>{loading ? 'Creating Account...' : 'Sign Up Free'}</span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Already have an account? {' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
