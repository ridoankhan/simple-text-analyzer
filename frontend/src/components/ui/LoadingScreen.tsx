import React from 'react';
import { FileText } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <FileText className="h-12 w-12 text-primary-600 mx-auto animate-pulse-slow" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading TextInsight</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we set things up...</p>
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-600 animate-[slide_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;