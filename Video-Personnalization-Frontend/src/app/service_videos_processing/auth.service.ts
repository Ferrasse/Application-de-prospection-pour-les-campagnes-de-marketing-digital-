// auth.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/service_videos_processing/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  y() {
      throw new Error('Method not implemented.');
  }
  constructor(private loginService: LoginService, private router: Router) {}

  isAuthenticated(): boolean {
    return !!this.loginService.getToken();
  }

  isAdmin(): boolean {
    return this.loginService.getIsAdmin();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/authentication/login-1']);
  }
}
