import { Noticia } from '../../../types/news';

type Props = {
  noticia: Noticia;
};

export const NoticiaCard = ({ noticia }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{noticia.titulo}</h2>

      <img
        src={noticia.url}
        alt={noticia.titulo}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <p className="text-gray-600 mb-2 flex-1">{noticia.descripcion}</p>

     

      <p className="text-xs text-gray-400 mt-2">Publicado: {noticia.fecha}</p>
    </div>
  );
};



