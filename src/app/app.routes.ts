import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/cms-admin.component').then(m => m.CmsAdminComponent)
  }
];
