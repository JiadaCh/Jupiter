import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {map, tap} from "rxjs";

const checkAuth = () =>{
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAdmin().pipe(
    tap(admin => {
      if (!admin) {
        router.navigate(['/home']).then(() => false);
      }
    }),
    map(admin => admin)
  );
}

export const adminGuard: CanActivateFn = () => {
  return checkAuth();
};

