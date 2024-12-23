import { Route } from '@angular/router';

export const coreRoutes: Route[] = [
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
    
];
