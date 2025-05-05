
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Donante } from '../types/donate';

const API_URL = 'https://api.jsonbin.io/v3/b/6818cbbc8a456b79669816fc';
const API_KEY = '$2a$10$DENA/.r4bFybbXVPbIvWk.YMDefPOll0GaiMSiKHacGkVUJbkeFEC';

export const fetchDonantes = async (): Promise<Donante[]> => {
  const response = await axios.get(API_URL, {
    headers: { 'X-Master-Key': API_KEY },
  });
  return response.data.record?.donantes ?? [];
};

const saveDonantes = async (donantes: Donante[]): Promise<void> => {
  await axios.put(
    API_URL,
    { donantes },
    {
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json',
        'X-Bin-Private': 'true',
      },
    }
  );
};

export const useDonantes = () => {
  return useQuery({
    queryKey: ['donantes'],
    queryFn: fetchDonantes,
    staleTime: 1000 * 60 * 10,
  });
};

export const useAddDonante = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDonante: Donante) => {
      const current = await fetchDonantes();
      await saveDonantes([...current, newDonante]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
};

export const useUpdateDonante = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updated: Donante) => {
      const current = await fetchDonantes();
      const modified = current.map((d) => (d.id === updated.id ? updated : d));
      await saveDonantes(modified);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
};

export const useDeleteDonante = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const current = await fetchDonantes();
      const filtered = current.filter((d) => d.id !== id);
      await saveDonantes(filtered);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
};
