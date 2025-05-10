import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 404,
  title = 'Page not found',
  message = 'Sorry, we couldn\'t find the page you\'re looking for.',
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
          {statusCode}
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;