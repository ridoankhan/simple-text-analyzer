import React from 'react';
import { TextAnalysis } from '../types';
import { 
  Hash, AlignLeft, AlignJustify, BarChart2, Type
} from 'lucide-react';

interface AnalysisResultsProps {
  analysis: TextAnalysis | null;
  loading: boolean;
  error: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!analysis) {
    return null;
  }
  
  const analysisItems = [
    {
      icon: <Hash className="h-5 w-5 text-blue-500" />,
      label: 'Word Count',
      value: analysis.wordCount,
    },
    {
      icon: <Type className="h-5 w-5 text-purple-500" />,
      label: 'Character Count',
      value: analysis.characterCount,
    },
    {
      icon: <AlignLeft className="h-5 w-5 text-green-500" />,
      label: 'Sentence Count',
      value: analysis.sentenceCount,
    },
    {
      icon: <AlignJustify className="h-5 w-5 text-amber-500" />,
      label: 'Paragraph Count',
      value: analysis.paragraphCount,
    },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Text Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {analysisItems.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              {item.icon}
              <h3 className="ml-2 text-sm font-medium text-gray-700">{item.label}</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
      
      <div className="border rounded-lg p-4">
        <div className="flex items-center mb-2">
          <BarChart2 className="h-5 w-5 text-indigo-500" />
          <h3 className="ml-2 text-sm font-medium text-gray-700">Longest Words</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {analysis.longestWords.map((word, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;