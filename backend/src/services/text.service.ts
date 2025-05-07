export const analyzeText = (text: string) => {
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');
  const sentences = text.split(/[.!?]/).filter(s => s.trim() !== '');
  const words = text.split(/\s+/).filter(w => w.trim() !== '');

  // Remove punctuation and whitespace for accurate character count
  const characters = text.replace(/[^\w]|_/g, '');
  console.log('characters', characters);

  const longestWords = paragraphs.map(paragraph => {
    const cleaned = paragraph.replace(/[^\w\s]|_/g, '');
    const wordsInParagraph = cleaned.split(/\s+/);
    return wordsInParagraph.reduce((longest, word) => {
      return word.length > longest.length ? word : longest;
    }, '');
  });

  return {
    wordCount: words.length,
    characterCount: characters.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    longestWords,
  };
};
