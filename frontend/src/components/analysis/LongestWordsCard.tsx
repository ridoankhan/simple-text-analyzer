import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface LongestWordsCardProps {
  longestWords: string[][];
}

const LongestWordsCard: React.FC<LongestWordsCardProps> = ({ longestWords }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show only the first 3 paragraphs when collapsed
  const displayedParagraphs = isExpanded ? longestWords : longestWords.slice(0, 3);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
            Longest Words by Paragraph
          </h3>
          {longestWords.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show All
                  <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {displayedParagraphs.map((words, paragraphIndex) => (
            <div key={paragraphIndex} className="border-t border-gray-100 pt-4 first:border-0 first:pt-0">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Paragraph {paragraphIndex + 1}
              </h4>
              {words.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {words.map((word, wordIndex) => (
                    <div 
                      key={wordIndex} 
                      className="px-3 py-1 rounded-full text-sm bg-primary-50 text-primary-700 border border-primary-100"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No significant words found</p>
              )}
            </div>
          ))}
        </div>
        
        {!isExpanded && longestWords.length > 3 && (
          <div className="mt-4 text-center border-t border-gray-100 pt-4">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Show {longestWords.length - 3} more paragraphs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LongestWordsCard;