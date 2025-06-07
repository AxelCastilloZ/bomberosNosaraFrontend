import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSuggestions,
  getSuggestionById,
  addSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from '../service/suggestionService';
import { Suggestion } from '../types/suggestion';

export const useSuggestions = () => {
  return useQuery<Suggestion[]>({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
  });
};

export const useSuggestion = (id: string) => {
  return useQuery<Suggestion>({
    queryKey: ['suggestion', id],
    queryFn: () => getSuggestionById(id),
    enabled: !!id,
  });
};

export const useAddSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuggestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['suggestions'] }),
  });
};

export const useUpdateSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Suggestion> }) => updateSuggestion(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['suggestions'] }),
  });
};

export const useDeleteSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSuggestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['suggestions'] }),
  });
};