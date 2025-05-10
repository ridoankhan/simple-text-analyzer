export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Text {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TextAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWords: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}