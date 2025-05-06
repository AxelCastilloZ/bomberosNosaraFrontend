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
  import NoticiasPage from '../pages/NoticiasPage'; 

  
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
      path: '/noticias',
      component: NoticiasPage,
      getParentRoute: () => rootRoute,
    }),
    
  ]);
  
  export const router = createRouter({ routeTree });