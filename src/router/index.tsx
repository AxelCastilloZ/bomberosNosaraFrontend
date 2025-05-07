import {
    createRouter,
    createRootRoute,
    createRoute,
    redirect,
  } from '@tanstack/react-router';
  
  import App from '../App';
  import Home from '../pages/Home';
  import DonantesPage from '../pages/DonantesPage';
  import AboutSection from '../components/ui/AboutUs/AboutSection';
  import AdminLoginPage from '../pages/AdminLoginPage';
  import AdminDonantesPage from '../pages/AdminDonantesPage';
  import { authenticateAdmin } from '../auth/AdminAuth';

  import AdminChatPage from '../pages/Administrativas/AdminChatPage';
import AdminEquipoPage from '../pages/Administrativas/AdminEquipoPage';
import AdminEstadisticasPage from '../pages/Administrativas/AdminEstadisticasPage';
import AdminUsuariosPage from '../pages/Administrativas/AdminUsuariosPage';
import AdminVehiculosPage from '../pages/Administrativas/AdminVehiculosPage';
import AdminDashboardPage from '../pages/Administrativas/AdminDashboardPage';


  
  const isAdminAuthenticated = () => {
    const user = localStorage.getItem('adminUser');
    const pass = localStorage.getItem('adminPass');
    return authenticateAdmin(user || '', pass || '');
  };
  
  const rootRoute = createRootRoute({ component: App });
  
  const routeTree = rootRoute.addChildren([
    createRoute({
      path: '/',
      component: Home,
      getParentRoute: () => rootRoute,
    }),
    createRoute({
      path: '/donantes',
      component: DonantesPage,
      getParentRoute: () => rootRoute,
    }),
    createRoute({
      path: '/sobre-nosotros',
      component: AboutSection,
      getParentRoute: () => rootRoute,
    }),
    createRoute({
      path: '/login',
      component: AdminLoginPage,
      getParentRoute: () => rootRoute,
    }),
    createRoute({
      path: '/admin/donantes',
      component: AdminDonantesPage,
      getParentRoute: () => rootRoute,
      beforeLoad: () => {
        if (!isAdminAuthenticated()) {
          throw redirect({ to: '/login' });
        }
      },
    }),
    createRoute({
        path: '/admin/chat',
        component: AdminChatPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      createRoute({
        path: '/admin/equipo',
        component: AdminEquipoPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      createRoute({
        path: '/admin/estadisticas',
        component: AdminEstadisticasPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      createRoute({
        path: '/admin/usuarios',
        component: AdminUsuariosPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      createRoute({
        path: '/admin/vehiculos',
        component: AdminVehiculosPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      createRoute({
        path: '/admin',
        component: AdminDashboardPage,
        getParentRoute: () => rootRoute,
        beforeLoad: () => {
          if (!isAdminAuthenticated()) throw redirect({ to: '/login' });
        },
      }),
      
      
  ]);
  
  export const router = createRouter({ routeTree });