import { Route } from '@angular/router';

export const authRoutes: Route[] = [
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
    
];
