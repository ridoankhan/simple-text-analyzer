import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, BarChart, Loader } from 'lucide-react';
import { textService } from '../services/textService';
import TextForm from '../components/text/TextForm';
import TextCard from '../components/text/TextCard';
import EmptyState from '../components/ui/EmptyState';
import ConfirmModal from '../components/ui/ConfirmModal';
import toast from 'react-hot-toast';

interface Text {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingText, setEditingText] = useState<Text | null>(null);
  const [textToDelete, setTextToDelete] = useState<Text | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTexts = async () => {
    setLoading(true);
    try {
      const fetchedTexts = await textService.getAllTexts();
      setTexts(fetchedTexts);
    } catch (error) {
      console.error('Failed to fetch texts:', error);
      toast.error('Failed to load your texts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const handleCreateText = async (content: string) => {
    try {
      const newText = await textService.createText(content);
      setTexts([newText, ...texts]);
      setShowCreateForm(false);
      toast.success('Text created successfully');
    } catch (error) {
      console.error('Failed to create text:', error);
      toast.error('Failed to create text');
    }
  };

  const handleUpdateText = async (id: string, content: string) => {
    try {
      const updatedText = await textService.updateText(id, content);
      setTexts(texts.map(text => text.id === id ? updatedText : text));
      setEditingText(null);
      toast.success('Text updated successfully');
    } catch (error) {
      console.error('Failed to update text:', error);
      toast.error('Failed to update text');
    }
  };

  const handleDeleteText = async () => {
    if (!textToDelete) return;
    
    try {
      await textService.deleteText(textToDelete.id);
      setTexts(texts.filter(text => text.id !== textToDelete.id));
      setTextToDelete(null);
      toast.success('Text deleted successfully');
    } catch (error) {
      console.error('Failed to delete text:', error);
      toast.error('Failed to delete text');
    }
  };

  const filteredTexts = texts.filter(text => 
    text.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Texts</h1>
          <p className="mt-1 text-gray-500">
            Create, manage, and analyze your text documents
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setEditingText(null);
          }}
          className="mt-4 md:mt-0 btn-primary flex items-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Text
        </button>
      </div>

      {(showCreateForm || editingText) && (
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">
              {editingText ? 'Edit Text' : 'Create New Text'}
            </h2>
            <TextForm
              initialContent={editingText?.content || ''}
              onSubmit={(content) => {
                if (editingText) {
                  handleUpdateText(editingText.id, content);
                } else {
                  handleCreateText(content);
                }
              }}
              onCancel={() => {
                setShowCreateForm(false);
                setEditingText(null);
              }}
            />
          </div>
        </div>
      )}

      {texts.length > 0 && (
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search your texts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-primary-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading your texts...</span>
        </div>
      ) : texts.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-12 w-12 text-gray-400" />}
          title="No texts yet"
          description="Create your first text to start analyzing"
          action={
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary mt-4"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Text
            </button>
          }
        />
      ) : filteredTexts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-gray-500">
            We couldn't find any texts matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 btn-outline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTexts.map((text) => (
            <TextCard
              key={text.id}
              text={text}
              onEdit={() => {
                setEditingText(text);
                setShowCreateForm(false);
              }}
              onDelete={() => setTextToDelete(text)}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!textToDelete}
        title="Delete Text"
        message="Are you sure you want to delete this text? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={handleDeleteText}
        onCancel={() => setTextToDelete(null)}
      />
    </div>
  );
};

export default Dashboard;