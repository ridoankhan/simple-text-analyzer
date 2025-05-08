import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, BarChart2, ExternalLink } from 'lucide-react';

interface Text {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TextCardProps {
  text: Text;
  onEdit: () => void;
  onDelete: () => void;
}

const TextCard: React.FC<TextCardProps> = ({ text, onEdit, onDelete }) => {
  // Format the dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="card hover:border-primary-300 transition-all duration-200 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="badge-primary">
            Text #{text.id.substring(0, 8)}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-gray-500 hover:text-primary-600 transition-colors"
              title="Edit text"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="text-gray-500 hover:text-error-600 transition-colors"
              title="Delete text"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </button>
          </div>
        </div>
        
        <div className="h-32 overflow-hidden mb-4">
          <p className="text-gray-700 text-sm whitespace-pre-wrap">
            {truncateContent(text.content)}
          </p>
        </div>
        
        <div className="flex flex-col space-y-1 text-xs text-gray-500 mb-4">
          <div>
            <span className="font-medium">Created:</span> {formatDate(text.createdAt)}
          </div>
          <div>
            <span className="font-medium">Last updated:</span> {formatDate(text.updatedAt)}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link
            to={`/analysis/${text.id}`}
            className="btn-primary text-xs px-3 py-1.5"
          >
            <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
            Analyze
          </Link>
          
          <button
            onClick={onEdit}
            className="btn-outline text-xs px-3 py-1.5"
          >
            <Edit className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextCard;