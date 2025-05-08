import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

interface AnalysisResult {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWords: string[][];
}

interface CountResult {
  count: number;
}

export const textAnalysisService = {
  async analyzeText(id: string): Promise<AnalysisResult> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/analyze`, {
      withCredentials: true
    });
    return response.data;
  },

  async getWordCount(id: string): Promise<CountResult> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/word-count`, {
      withCredentials: true
    });
    return response.data;
  },

  async getCharacterCount(id: string): Promise<CountResult> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/character-count`, {
      withCredentials: true
    });
    return response.data;
  },

  async getSentenceCount(id: string): Promise<CountResult> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/sentence-count`, {
      withCredentials: true
    });
    return response.data;
  },

  async getParagraphCount(id: string): Promise<CountResult> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/paragraph-count`, {
      withCredentials: true
    });
    return response.data;
  },

  async getLongestWords(id: string): Promise<{ longestWords: string[][] }> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}/longest-words`, {
      withCredentials: true
    });
    return response.data;
  }
};