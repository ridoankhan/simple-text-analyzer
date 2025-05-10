import api from './api';
import { Text, TextAnalysis } from '../types';

class TextService {
  async getAllTexts(): Promise<Text[]> {
    return api.get<Text[]>('/texts');
  }
  
  async getTextById(id: string): Promise<Text> {
    return api.get<Text>(`/texts/${id}`);
  }
  
  async createText(content: string, createdBy: string): Promise<Text> {
    return api.post<Text>('/texts', { content, createdBy });
  }
  
  async updateText(id: string, content: string): Promise<Text> {
    return api.put<Text>(`/texts/${id}`, { content });
  }
  
  async deleteText(id: string): Promise<void> {
    await api.delete<void>(`/texts/${id}`);
  }
  
  // Analysis methods
  async analyzeText(id: string): Promise<TextAnalysis> {
    return api.get<TextAnalysis>(`/texts/${id}/analyze`);
  }
  
  async getWordCount(id: string): Promise<{ count: number }> {
    return api.get<{ count: number }>(`/texts/${id}/word-count`);
  }
  
  async getCharacterCount(id: string): Promise<{ count: number }> {
    return api.get<{ count: number }>(`/texts/${id}/character-count`);
  }
  
  async getSentenceCount(id: string): Promise<{ count: number }> {
    return api.get<{ count: number }>(`/texts/${id}/sentence-count`);
  }
  
  async getParagraphCount(id: string): Promise<{ count: number }> {
    return api.get<{ count: number }>(`/texts/${id}/paragraph-count`);
  }
  
  async getLongestWords(id: string): Promise<{ words: string[] }> {
    return api.get<{ words: string[] }>(`/texts/${id}/longest-words`);
  }
}

export default new TextService();