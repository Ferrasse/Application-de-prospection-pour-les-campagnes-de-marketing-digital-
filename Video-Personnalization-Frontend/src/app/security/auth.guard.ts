import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../service_videos_processing/login.service';

export const AuthGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.getIsLogged()) {
    router.navigate(['/authentication/login-1']);
    return false;
  }
  return true;
};
