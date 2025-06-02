import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/login';

export async function login(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Auth error');
    }
    throw new Error('Unknown error');
  }
}
