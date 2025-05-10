import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <span className="ml-2 text-lg font-medium text-gray-700">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;