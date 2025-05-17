import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Noticia } from '../types/news'

const API_URL_NOTICIAS='https://api.jsonbin.io/v3/b/681a61ee8960c979a594935e';
const API_KEY='$2a$10$2Qe7w7qnouDtA0vJRto5But/xAv2GNMfE.STT5wNFEkoDi0r5a5Ou';

export const fetchNoticias = async (): Promise<Noticia[]> => {
  try {
    console.log('Fetching noticias...');
    const response = await axios.get(API_URL_NOTICIAS, {
      headers: { 
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response:', response.data);
    
    if (!response.data || !response.data.record) {
      console.error('Invalid response format:', response.data);
      throw new Error('Formato de respuesta inválido');
    }
    
    return response.data.record?.noticias ?? [];
  } catch (error) {
    console.error('Error fetching noticias:', error);
    if (error instanceof AxiosError) {
      throw new Error(`Error al obtener noticias: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

const saveNoticias = async (noticias: Noticia[]): Promise<void> => {
  try {
    console.log('Saving noticias:', noticias);
    const response = await axios.put(
      API_URL_NOTICIAS,
      { noticias },
      {
        headers: {
          'X-Master-Key': API_KEY,
          'Content-Type': 'application/json',
          'X-Bin-Private': 'false',
        },
      }
    );
    
    console.log('Save response:', response.data);
    
    if (!response.data) {
      console.error('Invalid save response:', response);
      throw new Error('Error al guardar las noticias');
    }
  } catch (error) {
    console.error('Error saving noticias:', error);
    if (error instanceof AxiosError) {
      throw new Error(`Error al guardar noticias: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

export const useNoticias = () => {
  return useQuery({
    queryKey: ['noticias'],
    queryFn: fetchNoticias,
    staleTime: 1000 * 60 * 10, 
    retry: 2,
  });
};

export const useAddNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNoticia: Noticia) => {
      console.log('Adding noticia:', newNoticia);
      const current = await fetchNoticias();
      if (current.some(n => n.id === newNoticia.id)) {
        throw new Error('Ya existe una noticia con este ID');
      }
      await saveNoticias([...current, newNoticia]);
    },
    onSuccess: () => {
      console.log('Successfully added noticia');
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
    onError: (error: Error) => {
      console.error('Error adding noticia:', error);
    }
  });
};

export const useUpdateNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updated: Noticia) => {
      console.log('Updating noticia:', updated);
      const current = await fetchNoticias();
      if (!current.some(n => n.id === updated.id)) {
        throw new Error('No se encontró la noticia a actualizar');
      }
      const modified = current.map((n) => (n.id === updated.id ? updated : n));
      await saveNoticias(modified);
    },
    onSuccess: () => {
      console.log('Successfully updated noticia');
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
    onError: (error: Error) => {
      console.error('Error updating noticia:', error);
    }
  });
};

export const useDeleteNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting noticia:', id);
      const current = await fetchNoticias();
      if (!current.some(n => n.id === id)) {
        throw new Error('No se encontró la noticia a eliminar');
      }
      const filtered = current.filter((n) => n.id !== id);
      await saveNoticias(filtered);
    },
    onSuccess: () => {
      console.log('Successfully deleted noticia');
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting noticia:', error);
    }
  });
};
