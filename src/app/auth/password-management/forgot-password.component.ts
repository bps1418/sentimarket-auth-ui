import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  input = '';
  message = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient) {}

  submit(): void {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.http.post(`${ApiEndpoints.Auth.FORGOT_PASSWORD}`, { input: this.input }, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.error || 'Something went wrong.';
          this.loading = false;
        }
      });
  }
}