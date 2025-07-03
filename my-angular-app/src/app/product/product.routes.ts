import { Routes } from '@angular/router';
import { ProductViewComponent } from '../components/product-view.component';
import { ProductAddComponent } from '../components/product-add.component';
import { ProductDeleteComponent } from '../components/product-delete.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';
import { canDeactivateGuard } from '../guards/can-deactivate.guard';

export const routes: Routes = [
  { path: '', component: ProductViewComponent, canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'add', component: ProductAddComponent, canActivate: [authGuard, roleGuard], canDeactivate: [canDeactivateGuard], data: { roles: ['user'] } },
  { path: 'delete', component: ProductDeleteComponent, canActivate: [authGuard, roleGuard], data: { roles: ['user'] } }
];
