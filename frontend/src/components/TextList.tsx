import React from 'react';
import { Text } from '../types';
import TextItem from './TextItem';
import { FileSearch } from 'lucide-react';

interface TextListProps {
  texts: Text[];
  onDelete: () => void;
  onEdit: (text: Text) => void;
  loading: boolean;
}

const TextList: React.FC<TextListProps> = ({ texts, onDelete, onEdit, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse space-y-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (texts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileSearch className="h-16 w-16 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No texts found</h3>
        <p className="mt-1 text-gray-500">Create your first text to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {texts.map((text) => (
        <TextItem key={text.id} text={text} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TextList;