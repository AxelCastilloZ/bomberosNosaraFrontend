
import { FaUserShield, FaUsers, FaFireExtinguisher, FaTruck, FaChartBar, FaComments ,FaNewspaper} from "react-icons/fa";

const dashboardItems = [
  { icon: <FaUserShield size={24} />, label: "Administrar Donantes", href: "/admin/donantes" },
  { icon: <FaUsers size={24} />, label: "Gestión de Usuarios", href: "/admin/usuarios" },
  { icon: <FaFireExtinguisher size={24} />, label: "Inventario de Equipo", href: "/admin/equipo" },
  { icon: <FaTruck size={24} />, label: "Inventario de Vehículos", href: "/admin/vehiculos" },
  { icon: <FaChartBar size={24} />, label: "Estadísticas", href: "/admin/estadisticas" },
  { icon: <FaComments size={24} />, label: "Chat Interno", href: "/admin/chat" },
  { icon: <FaNewspaper size={24}/>, label: "Administrar Noticias", href: "/admin/noticias"},
];

const AdminDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-red-700">Panel Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-all hover:-translate-y-1 flex items-center space-x-4 hover:bg-gray-50"
          >
            <div className="text-red-600">{icon}</div>
            <span className="font-medium text-gray-800">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
