import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnalysisResults from '../components/AnalysisResults';
import textService from '../services/textService';
import { Text, TextAnalysis } from '../types';
import { ArrowLeft, FileText } from 'lucide-react';

const TextAnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [text, setText] = useState<Text | null>(null);
  const [analysis, setAnalysis] = useState<TextAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('full');
  
  useEffect(() => {
    const loadText = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const textData = await textService.getTextById(id);
        setText(textData);
        setError(null);
        
        // Load full analysis by default
        await handleAnalyze('full');
      } catch (err) {
        console.error('Failed to load text:', err);
        setError('Failed to load the text. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadText();
  }, [id]);
  
  const handleAnalyze = async (type: string) => {
    if (!id) return;
    
    setAnalyzeLoading(true);
    setSelectedAnalysis(type);
    
    try {
      let result;
      
      switch (type) {
        case 'wordCount':
          result = await textService.getWordCount(id);
          setAnalysis({
            wordCount: result.count,
            characterCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            longestWords: [],
          });
          break;
          
        case 'characterCount':
          result = await textService.getCharacterCount(id);
          setAnalysis({
            wordCount: 0,
            characterCount: result.count,
            sentenceCount: 0,
            paragraphCount: 0,
            longestWords: [],
          });
          break;
          
        case 'sentenceCount':
          result = await textService.getSentenceCount(id);
          setAnalysis({
            wordCount: 0,
            characterCount: 0,
            sentenceCount: result.count,
            paragraphCount: 0,
            longestWords: [],
          });
          break;
          
        case 'paragraphCount':
          result = await textService.getParagraphCount(id);
          setAnalysis({
            wordCount: 0,
            characterCount: 0,
            sentenceCount: 0,
            paragraphCount: result.count,
            longestWords: [],
          });
          break;
          
        case 'longestWords':
          result = await textService.getLongestWords(id);
          setAnalysis({
            wordCount: 0,
            characterCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            longestWords: result.words,
          });
          break;
          
        case 'full':
        default:
          const fullAnalysis = await textService.analyzeText(id);
          setAnalysis(fullAnalysis);
          break;
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to analyze text:', err);
      setError('Failed to analyze the text. Please try again.');
    } finally {
      setAnalyzeLoading(false);
    }
  };
  
  const analysisButtons = [
    { id: 'full', label: 'Full Analysis' },
    { id: 'wordCount', label: 'Word Count' },
    { id: 'characterCount', label: 'Character Count' },
    { id: 'sentenceCount', label: 'Sentence Count' },
    { id: 'paragraphCount', label: 'Paragraph Count' },
    { id: 'longestWords', label: 'Longest Words' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-blue-500 mt-1" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Text Analysis</h1>
                
                {loading ? (
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3"></div>
                ) : (
                  text && (
                    <p className="text-gray-700 mb-4">
                      {text.content.length > 100
                        ? `${text.content.substring(0, 100)}...`
                        : text.content}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {analysisButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => handleAnalyze(button.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedAnalysis === button.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={analyzeLoading}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
          
          <AnalysisResults analysis={analysis} loading={analyzeLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default TextAnalysisPage;