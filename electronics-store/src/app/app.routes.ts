import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: ':category',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: '**', redirectTo: 'all' }
];
