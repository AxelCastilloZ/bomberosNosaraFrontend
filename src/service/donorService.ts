import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Donante } from '../types/donate';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/donantes`;

// GET all
export const useDonantes = () => {
  return useQuery({
    queryKey: ['donantes'],
    queryFn: async (): Promise<Donante[]> => {
      const res = await axios.get(API_URL);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

// POST
export const useAddDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDonante: Donante) => {
      await axios.post(API_URL, newDonante);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

// PUT
export const useUpdateDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (donante: Donante) => {
      await axios.put(`${API_URL}/${donante.id}`, donante);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

// DELETE
export const useDeleteDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};
