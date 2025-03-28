import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username = '';
  dropdownOpen = false;
  avatar = '';
  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user_info');
    this.username = user ? JSON.parse(user).username || 'User' : 'User';
    this.avatar = user ? JSON.parse(user).avatarUrl || '' : '';
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/dashboard/profile']);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
  get userInitial(): string {
    return this.username ? this.username.charAt(0).toUpperCase() : 'U';
  }

  get avatarUrl(): string {
    return this.avatar;
  }
}