import { ListaNoticias } from '../components/ui/Noticias/ListaNoticias';

const NoticiasPage = () => {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Últimas Noticias</h1>
      <ListaNoticias />
    </main>
  );
};

export default NoticiasPage;
