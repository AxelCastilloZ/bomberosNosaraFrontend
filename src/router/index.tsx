import {
    createRouter,
    createRootRoute,
    createRoute,
  } from '@tanstack/react-router';

  import App from '../App';
  import Home from '../pages/Home';
import { DonantesPage } from '../pages/DonantesPage';
import AboutSection from '../components/ui/AboutUs/AboutSection';

    const rootRoute = createRootRoute({ component: App });

    const routeTree = rootRoute.addChildren([
        createRoute({ path: '/', component: Home, getParentRoute: () => rootRoute }),
        createRoute({ path: '/donantes', component: DonantesPage, getParentRoute: () => rootRoute }),
        createRoute({ path: '/sobre-nosotros', component: AboutSection, getParentRoute: () => rootRoute }),
        createRoute({ path: '/vista-administrativa', component: DonantesPage, getParentRoute: () => rootRoute }),
    ])

export const router = createRouter({ routeTree });