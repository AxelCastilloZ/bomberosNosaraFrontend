import axios from 'axios';

const API_URL = 'https://localhost:7098/login'; 

export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data.token;
  } catch (error) {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || 'Auth error');
  }
  throw new Error('Unknown error');
}
}