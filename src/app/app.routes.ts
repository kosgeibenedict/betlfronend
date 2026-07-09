import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/cms-admin.component').then(m => m.CmsAdminComponent)
  },
  {
    path: 'inteliport',
    loadComponent: () => import('./inteliport/inteliport.component').then(m => m.InteliportComponent)
  }
];
