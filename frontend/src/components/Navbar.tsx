import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  if (!user) return null;
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="ml-2 font-semibold text-xl text-gray-800">Text Analyzer</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition duration-150"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-1">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;