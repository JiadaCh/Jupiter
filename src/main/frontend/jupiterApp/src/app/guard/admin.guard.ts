import {CanActivateFn, CanMatchFn, Route, Router, UrlSegment} from '@angular/router';
import {AuthService} from "@service/auth.service";
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (!authService.user())  router.navigate(['/']);

  return authService.user()!.rol == "admin";

};

export const canMatchAdminGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService: AuthService = inject(AuthService);
  if (!authService.user())  return false;

  return authService.user()!.rol == "admin";
};
