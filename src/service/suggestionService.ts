import axios from 'axios';
import { Suggestion } from '../types/suggestion';

const API_URL = 'http://localhost:3000/sugerencias';

export const getSuggestions = async (): Promise<Suggestion[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getSuggestionById = async (id: string): Promise<Suggestion> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addSuggestion = async (suggestion: Omit<Suggestion, 'id' | 'fecha'>): Promise<Suggestion> => {
  const res = await axios.post(API_URL, suggestion);
  return res.data;
};

export const updateSuggestion = async (id: string, suggestion: Partial<Suggestion>): Promise<Suggestion> => {
  const res = await axios.put(`${API_URL}/${id}`, suggestion);
  return res.data;
};

export const deleteSuggestion = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};