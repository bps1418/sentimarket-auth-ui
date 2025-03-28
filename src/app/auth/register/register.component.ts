import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  name = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.toast.show('Passwords do not match');
      return;
    }

    const payload = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name
    };

    this.loading = true;
    this.http.post(ApiEndpoints.Auth.REGISTER, payload, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.toast.show('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toast.show(err?.error || 'Registration failed');
          this.loading = false;
        }
      });
  }
}