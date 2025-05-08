import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { textService } from '../services/textService';
import { textAnalysisService } from '../services/textAnalysisService';
import { ArrowLeft, BarChart2, Hash, FileText, AlignJustify, Clock, Loader, BookOpen } from 'lucide-react';
import AnalysisCard from '../components/analysis/AnalysisCard';
import LongestWordsCard from '../components/analysis/LongestWordsCard';
import toast from 'react-hot-toast';

interface AnalysisResult {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWords: string[][];
}

const TextAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [text, setText] = useState<{ id: string; content: string } | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  
  useEffect(() => {
    const fetchTextDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const textData = await textService.getTextById(id);
        setText(textData);
        
        // Attempt to fetch analysis right away
        fetchAnalysis();
      } catch (error) {
        console.error('Failed to fetch text:', error);
        toast.error('Failed to load text details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTextDetails();
  }, [id, navigate]);
  
  const fetchAnalysis = async () => {
    if (!id) return;
    
    setAnalyzing(true);
    try {
      const result = await textAnalysisService.analyzeText(id);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to analyze text:', error);
      toast.error('Failed to analyze text');
    } finally {
      setAnalyzing(false);
    }
  };
  
  const fetchSpecificAnalysis = async (type: string) => {
    if (!id) return;
    
    try {
      let result;
      switch (type) {
        case 'word-count':
          result = await textAnalysisService.getWordCount(id);
          toast.success(`Word count: ${result.count}`);
          break;
        case 'character-count':
          result = await textAnalysisService.getCharacterCount(id);
          toast.success(`Character count: ${result.count}`);
          break;
        case 'sentence-count':
          result = await textAnalysisService.getSentenceCount(id);
          toast.success(`Sentence count: ${result.count}`);
          break;
        case 'paragraph-count':
          result = await textAnalysisService.getParagraphCount(id);
          toast.success(`Paragraph count: ${result.count}`);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to get ${type}:`, error);
      toast.error(`Failed to get ${type}`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-primary-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading text details...</span>
      </div>
    );
  }
  
  if (!text) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Text not found</h3>
        <p className="mt-1 text-gray-500">
          The text you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Text Analysis</h1>
        <p className="mt-1 text-gray-500">
          Analyzing text #{text.id.substring(0, 8)}
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-medium mb-2 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary-600" />
          Text Content
        </h2>
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          <p className="whitespace-pre-wrap">{text.content}</p>
        </div>
      </div>
      
      {!analysis && !analyzing ? (
        <div className="text-center py-8 bg-white shadow rounded-lg border border-gray-200">
          <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Ready to analyze</h3>
          <p className="mt-1 text-gray-500 max-w-md mx-auto">
            Click the button below to analyze this text and get insights about its structure.
          </p>
          <button
            onClick={fetchAnalysis}
            className="mt-4 btn-primary"
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Analyze Text
          </button>
        </div>
      ) : analyzing ? (
        <div className="text-center py-8 bg-white shadow rounded-lg border border-gray-200">
          <Loader className="mx-auto h-12 w-12 text-primary-500 animate-spin" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Analyzing Text</h3>
          <p className="mt-1 text-gray-500">
            Please wait while we analyze your text...
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Analysis Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnalysisCard
              title="Word Count"
              value={analysis?.wordCount || 0}
              icon={<Hash className="h-5 w-5 text-primary-600" />}
              onClick={() => fetchSpecificAnalysis('word-count')}
            />
            <AnalysisCard
              title="Character Count"
              value={analysis?.characterCount || 0}
              icon={<FileText className="h-5 w-5 text-secondary-600" />}
              onClick={() => fetchSpecificAnalysis('character-count')}
            />
            <AnalysisCard
              title="Sentence Count"
              value={analysis?.sentenceCount || 0}
              icon={<Clock className="h-5 w-5 text-accent-600" />}
              onClick={() => fetchSpecificAnalysis('sentence-count')}
            />
            <AnalysisCard
              title="Paragraph Count"
              value={analysis?.paragraphCount || 0}
              icon={<AlignJustify className="h-5 w-5 text-warning-600" />}
              onClick={() => fetchSpecificAnalysis('paragraph-count')}
            />
          </div>
          
          {analysis?.longestWords && analysis.longestWords.length > 0 && (
            <LongestWordsCard longestWords={analysis.longestWords} />
          )}
          
          <div className="mt-8 text-center">
            <button
              onClick={fetchAnalysis}
              className="btn-outline"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Refresh Analysis
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TextAnalysis;