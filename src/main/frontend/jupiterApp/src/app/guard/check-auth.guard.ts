import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "@service/auth.service";
import {inject} from "@angular/core";
import {map, tap} from "rxjs";

export const checkAuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuth().pipe(
    tap(auth => {
      if (auth) {
        router.navigate(['/']);
      }
    }),
    map(auth => !auth)
  );
};
