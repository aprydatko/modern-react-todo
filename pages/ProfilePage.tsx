
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User, Mail, Calendar, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.todos);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-3xl border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-white"
            />
            <button className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors">
              <Settings size={22} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">Regular Member</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                <Mail className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-gray-900 dark:text-gray-200 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                <Calendar className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account Created</p>
                  <p className="text-gray-900 dark:text-gray-200 font-medium">October 2023</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Account Stats</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-1">Productivity Level</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-blue-700 dark:text-blue-300">{items.length} Tasks</span>
                  <div className="h-12 w-12 rounded-full border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
