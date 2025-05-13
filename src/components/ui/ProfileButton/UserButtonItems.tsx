import { useRouter } from "@tanstack/react-router";

type UserButtonItemsProps = {
  label: string;
  to?: 
    '/' |
    '/login' |
    '/admin' |
    '/admin/donantes' |
    '/admin/usuarios' |
    '/admin/vehiculos' |
    '/admin/chat' |
    '/settings'; // ✅ agregado aquí
  onClick?: () => void;
  isDanger?: boolean;
};

const UserButtonItems = ({ label, to, onClick, isDanger }: UserButtonItemsProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();           // Ejecuta acción directa si hay onClick
    if (to) router.navigate({ to });         // Navega usando TanStack Router v1
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
        isDanger ? "text-red-600 font-medium" : "text-gray-800"
      }`}
    >
      {label}
    </button>
  );
};

export default UserButtonItems;
