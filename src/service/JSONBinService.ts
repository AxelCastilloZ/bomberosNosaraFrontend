import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Donante } from '../types/donate';
import { Noticia } from '../types/news';

const API_URL = 'https://api.jsonbin.io/v3/b/6818cbbc8a456b79669816fc';
const API_KEY = '$2a$10$DENA/.r4bFybbXVPbIvWk.YMDefPOll0GaiMSiKHacGkVUJbkeFEC';

interface JSONBinData {
  donantes: Donante[];
  noticias: Noticia[];
}


const fetchData = async (): Promise<JSONBinData> => {
  const response = await axios.get(API_URL, {
    headers: {
      'X-Master-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  const data = response.data?.record;

  // Si faltan propiedades, se agregan y se guarda el bin actualizado
  const fixedData: JSONBinData = {
    donantes: data?.donantes ?? [],
    noticias: data?.noticias ?? [],
  };

  if (!data?.donantes || !data?.noticias) {
    console.log('Corrigiendo estructura del bin JSON...');
    await saveData(fixedData);
  }

  return fixedData;
};


const saveData = async (newData: JSONBinData): Promise<void> => {
  await axios.put(API_URL, newData, {
    headers: {
      'X-Master-Key': API_KEY,
      'Content-Type': 'application/json',
      'X-Bin-Private': 'true',
    },
  });
};

//DONANTES
export const useDonantes = () => {
  return useQuery({
    queryKey: ['donantes'],
    queryFn: async () => (await fetchData()).donantes,
    staleTime: 1000 * 60 * 10,
  });
};

export const useAddDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDonante: Donante) => {
      const data = await fetchData();
      await saveData({ ...data, donantes: [...data.donantes, newDonante] });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

export const useUpdateDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updated: Donante) => {
      const data = await fetchData();
      const updatedList = data.donantes.map(d =>
        d.id === updated.id ? updated : d
      );
      await saveData({ ...data, donantes: updatedList });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

export const useDeleteDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchData();
      const filtered = data.donantes.filter(d => d.id !== id);
      await saveData({ ...data, donantes: filtered });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

//NOTICIAS
export const useNoticias = () => {
  return useQuery({
    queryKey: ['noticias'],
    queryFn: async () => (await fetchData()).noticias,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useAddNoticia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newNoticia: Noticia) => {
      const data = await fetchData();
      if (data.noticias.some(n => n.id === newNoticia.id))
        throw new Error('Ya existe una noticia con este ID');
      await saveData({ ...data, noticias: [...data.noticias, newNoticia] });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['noticias'] }),
  });
};

export const useUpdateNoticia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updated: Noticia) => {
      const data = await fetchData();
      const updatedList = data.noticias.map(n =>
        n.id === updated.id ? updated : n
      );
      await saveData({ ...data, noticias: updatedList });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['noticias'] }),
  });
};

export const useDeleteNoticia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchData();
      const filtered = data.noticias.filter(n => n.id !== id);
      await saveData({ ...data, noticias: filtered });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['noticias'] }),
  });
};
