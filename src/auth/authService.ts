import axios from 'axios';

const API_URL = 'https://localhost:7155/api/auth/login'; 

export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data.token;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    }
    throw new Error('Error al conectar con el servidor');
  }
}
