/*import { useNoticias } from '../api/newsService';
import { NoticiaCard } from './ui/NoticiaCard';

export const ListaNoticias = () => {
  const { data, isLoading, isError } = useNoticias();

  if (isLoading) return <p className="text-center text-gray-500">Cargando noticias...</p>;
  if (isError) return <p className="text-center text-red-500">Error al cargar noticias</p>;

  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">No hay noticias disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((noticia) => (
        <NoticiaCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
};*/

import { NoticiaCard } from './NoticiaCard';
import { useNoticias } from '../../../service/JSONBinNoticia';

export const ListaNoticias = () => {
  const { data, isLoading, error } = useNoticias();

  if (isLoading) return <p>Cargando noticias...</p>;
  if (error) return <p>Error al cargar noticias.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((noticia) => (
        <NoticiaCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
};

