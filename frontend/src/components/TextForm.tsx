import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import textService from '../services/textService';

interface TextFormProps {
  onTextCreated: () => void;
  initialContent?: string;
  textId?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TextForm: React.FC<TextFormProps> = ({
  onTextCreated,
  initialContent = '',
  textId,
  isEditing = false,
  onCancel
}) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some text to analyze');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (isEditing && textId) {
        await textService.updateText(textId, content);
      } else {
        await textService.createText(content, user?.name || 'Unknown User');
      }
      setContent('');
      onTextCreated();
    } catch (err) {
      console.error('Failed to save text:', err);
      setError('Failed to save your text. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {isEditing ? 'Edit Text' : 'Create New Text'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Text Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            placeholder="Enter your text here..."
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="flex justify-end space-x-3">
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditing ? 'Update Text' : 'Save Text'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextForm;