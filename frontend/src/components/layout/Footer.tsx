import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} TextInsight. All rights reserved.</p>
          <p className="mt-1">
            Powerful text analysis at your fingertips.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;