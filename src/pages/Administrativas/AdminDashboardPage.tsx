const AdminDashboardPage = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Panel Administrativo</h1>
        <ul className="list-disc list-inside space-y-2">
          <li><a href="/admin/donantes" className="text-blue-600 underline">Administrar Donantes</a></li>
          <li><a href="/admin/usuarios" className="text-blue-600 underline">Gestión de Usuarios</a></li>
          <li><a href="/admin/equipo" className="text-blue-600 underline">Inventario de Equipo</a></li>
          <li><a href="/admin/vehiculos" className="text-blue-600 underline">Inventario de Vehículos</a></li>
          <li><a href="/admin/estadisticas" className="text-blue-600 underline">Estadísticas</a></li>
          <li><a href="/admin/chat" className="text-blue-600 underline">Chat Interno</a></li>
        </ul>
      </div>
    );
  };
  
  export default AdminDashboardPage;
  