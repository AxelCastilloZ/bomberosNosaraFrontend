import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosAuth } from './axiosClient'; // cliente con token
import { Donante } from '../types/donate';

export const useDonantes = () =>
  useQuery({
    queryKey: ['donantes'],
    queryFn: async () => {
      const res = await axiosAuth.get<Donante[]>('/donantes');
      return res.data;
    },
  });

export const useAddDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nuevo: Donante) => {
      await axiosAuth.post('/donantes', nuevo);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

export const useUpdateDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (donante: Donante) => {
      await axiosAuth.put(`/donantes/${donante.id}`, donante);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};

export const useDeleteDonante = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosAuth.delete(`/donantes/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['donantes'] }),
  });
};




