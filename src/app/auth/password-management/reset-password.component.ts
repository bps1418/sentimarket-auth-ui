import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  message = '';
  error = '';
  loading = false;

  errorType: 'expired' | 'invalid' | '' = '';
  originalUserInput = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.originalUserInput = params['input'] || ''; // optional for resend
    });
  }

  submit(): void {
    if (!this.token || !this.newPassword) return;

    this.loading = true;
    this.message = '';
    this.error = '';
    this.errorType = '';

    this.http.post(ApiEndpoints.Auth.RESET_PASSWORD, {
      token: this.token,
      newPassword: this.newPassword
    }, { responseType: 'text' }).subscribe({
      next: (res) => {
        this.message = res;
        this.loading = false;

        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.error = err?.error || 'Something went wrong.';
        this.loading = false;

        if (err.status === 410) {
          this.errorType = 'expired';
        } else if (err.status === 404) {
          this.errorType = 'invalid';
        }
      }
    });
  }

  resendResetLink(): void {
    if (!this.originalUserInput) {
      this.toastService.show('We do not have the user identifier to resend the link.');
      return;
    }

    this.http.post(ApiEndpoints.Auth.FORGOT_PASSWORD, {
      input: this.originalUserInput
    }, { responseType: 'text' }).subscribe({
      next: () => {
        this.toastService.show('A new reset link has been sent to your email.');
        this.errorType = '';
      },
      error: () => this.toastService.show('Failed to resend link')
    });
  }
}