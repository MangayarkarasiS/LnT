import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getRole();

  if (authService.isLoggedIn() && expectedRoles && expectedRoles.includes(userRole || '' )) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
