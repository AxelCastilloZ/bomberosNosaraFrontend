
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Noticia } from '../types/news'

const API_URL_NOTICIAS='https://api.jsonbin.io/v3/b/68190f108561e97a500e5e1b';
const API_KEY='$2a$10$DENA/.r4bFybbXVPbIvWk.YMDefPOll0GaiMSiKHacGkVUJbkeFEC';


export const fetchNoticias=async (): Promise<Noticia[]> => {
    const response=await axios.get(API_URL_NOTICIAS, {
        headers: { 'X-Master-Key': API_KEY },
    });
    return response.data.record?.noticias??[];
};


const saveNoticias=async (noticias: Noticia[]): Promise<void> => {
    await axios.put(
        API_URL_NOTICIAS,
        { noticias },
        {
            headers: {
                'X-Master-Key': API_KEY,
                'Content-Type': 'application/json',
                'X-Bin-Private': 'true',
            },
        }
    );
};

export const useNoticias=() => {
    return useQuery({
        queryKey: ['noticias'],
        queryFn: fetchNoticias,
        staleTime: 1000*60*10,
    });
};


export const useAddNoticia=() => {
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn: async (newNoticia: Noticia) => {
            const current=await fetchNoticias();
            await saveNoticias([...current, newNoticia]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['noticias'] });
        },
    });
};


export const useUpdateNoticia=() => {
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn: async (updated: Noticia) => {
            const current=await fetchNoticias();
            const modified=current.map((n) => (n.id===updated.id? updated:n));
            await saveNoticias(modified);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['noticias'] });
        },
    });
};


export const useDeleteNoticia=() => {
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const current=await fetchNoticias();
            const filtered=current.filter((n) => n.id!==id);
            await saveNoticias(filtered);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['noticias'] });
        },
    });
};
