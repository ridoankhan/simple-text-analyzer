import React, { ReactNode } from 'react';

interface AnalysisCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  onClick?: () => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, value, icon, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900">{value.toLocaleString()}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {onClick && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <div className="font-medium text-primary-600 hover:text-primary-700">
              View specific details
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;