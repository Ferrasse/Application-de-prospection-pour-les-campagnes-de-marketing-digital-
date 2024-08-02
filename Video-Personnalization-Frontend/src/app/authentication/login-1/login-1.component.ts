// login-1.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/service_videos_processing/login.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login-1.component.html'
})
export class Login1Component implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  errorMessage = '';
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            const role = this.loginService.getIsAdmin();
            if (!role) {
              this.router.navigate(['/dashboard/demo-one']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/admin']);
            }
          },
          error: (err) => {
            this.isLoading = false;
            if (err.status === 401) {
              this.errorMessage = 'Invalid username or password';
            } else {
              this.errorMessage = 'An error occurred. Please try again later.';
            }
            this.error = true;
            console.error(err);
          }
        });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
