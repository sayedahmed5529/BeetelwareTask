import { Routes } from '@angular/router';
import { UserGuard } from './modules/auth/guards/user.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';

export const routes: Routes = [   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: '',
    loadComponent: () => import('./modules/feature/components/home/home.component').then(c => c.HomeComponent),
    loadChildren: () => import('./modules/feature/home.routes').then(r => r.coreRoutes),
    canActivate: [AuthGuard],
   
},
{
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(r => r.authRoutes),
    canActivate:[UserGuard]
 
},
{
    path: 'access-denied',
    loadComponent: () => import('./modules/shared/error/error.component').then(c => c.ErrorComponent),
    data: { mode: 'access_denied' }
},
{
    path: 'error',
    loadComponent: () => import('./modules/shared/error/error.component').then(c => c.ErrorComponent),
    data: { mode: 'error' }
},
{
    path: '**',
    loadComponent: () => import('./modules/shared/error/error.component').then(c => c.ErrorComponent),
    data: { mode: 'not_found' }
}
];
