import { useState } from 'react';
import AddUserForm from '../../components/ui/Administrativa/UsuariosAdmin/AddUserForm';
import EditUserModal from '../../components/ui/Administrativa/UsuariosAdmin/EditUserModal';
import UsuariosTable from '../../components/ui/Administrativa/UsuariosAdmin/UsuariosTable';


const mockUser = {
  id: 1,
  nombre: 'Carlos Pérez',
  email: 'carlos@bomberos.com',
  rol: 'admin'
};

const AdminUsuariosPage = () => {
  const [editingUser, setEditingUser] = useState<typeof mockUser | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Usuarios</h1>
      <AddUserForm />
      <UsuariosTable />
      {editingUser && (
        <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default AdminUsuariosPage;
