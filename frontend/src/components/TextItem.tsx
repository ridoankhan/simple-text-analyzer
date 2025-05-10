import React, { useState } from 'react';
import { Text } from '../types';
import { Edit, Trash2, BarChart2, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import textService from '../services/textService';

interface TextItemProps {
  text: Text;
  onDelete: () => void;
  onEdit: (text: Text) => void;
}

const TextItem: React.FC<TextItemProps> = ({ text, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this text?')) {
      setIsDeleting(true);
      try {
        await textService.deleteText(text.id);
        onDelete();
      } catch (err) {
        console.error('Failed to delete text:', err);
        alert('Failed to delete text. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Truncate content if it's too long
  const truncatedContent = text.content.length > 150
    ? `${text.content.substring(0, 150)}...`
    : text.content;
  
  return (
    <div className="bg-white rounded-lg shadow p-4 transition duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <div className="font-medium text-gray-800 mb-1 truncate">
            {truncatedContent}
          </div>
          <p className="text-sm text-gray-500">
            Created by {text.createdBy} on {formatDate(text.createdAt)}
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(text);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <Link
                  to={`/texts/${text.id}/analyze`}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analyze
                </Link>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                  disabled={isDeleting}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextItem;