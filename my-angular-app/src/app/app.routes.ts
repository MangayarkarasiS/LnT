import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ProductViewComponent } from './components/product-view.component';
import { ProductAddComponent } from './components/product-add.component';
import { ProductDeleteComponent } from './components/product-delete.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductViewComponent, canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'products/add', component: ProductAddComponent, canActivate: [authGuard, roleGuard], canDeactivate: [canDeactivateGuard], data: { roles: ['user'] } },
  { path: 'products/delete', component: ProductDeleteComponent, canActivate: [authGuard, roleGuard], data: { roles: ['user'] } },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
 