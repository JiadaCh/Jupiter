import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "@service/auth.service";
import {inject} from "@angular/core";

const checkAuth = () =>{
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.user())  router.navigate(['/']);

  return authService.user()!.rol == "admin";
}

export const adminGuard: CanActivateFn = (route, state) => {
  return checkAuth();
};

