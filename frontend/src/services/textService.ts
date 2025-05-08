import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

interface Text {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const textService = {
  async getAllTexts(): Promise<Text[]> {
    const response = await axios.get(`${API_URL}/api/v1/texts`, {
      withCredentials: true
    });
    return response.data;
  },

  async getTextById(id: string): Promise<Text> {
    const response = await axios.get(`${API_URL}/api/v1/texts/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  async createText(content: string): Promise<Text> {
    const response = await axios.post(
      `${API_URL}/api/v1/texts`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  },

  async updateText(id: string, content: string): Promise<Text> {
    const response = await axios.put(
      `${API_URL}/api/v1/texts/${id}`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteText(id: string): Promise<void> {
    await axios.delete(`${API_URL}/api/v1/texts/${id}`, {
      withCredentials: true
    });
  }
};