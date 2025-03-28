import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username = '';
  name = '';
  email = '';
  phone = '';
  bio = '';
  socialUrl = '';
  avatarUrl = '';
  selectedFile: File | null = null;

  oldPassword = '';
  newPassword = '';

  constructor(private profileService: ProfileService, private http: HttpClient,private toast: ToastService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.username = profile.username;
      this.name = profile.name;
      this.email = profile.email;
      this.phone = profile.phone;
      this.bio = profile.bio;
      this.socialUrl = profile.socialUrl;
      this.avatarUrl = profile.avatarUrl || this.generateAvatar(profile.username);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.profileService.uploadAvatar(this.selectedFile).subscribe({
        next: (url: string) => {
          this.avatarUrl = url;
          this.save();
        },
        error: () => this.toast.show('Upload failed')
      });
    }
  }

  save(): void {
    const profile: UserProfile = {
      username: this.username,
      name: this.name,
      email: this.email,
      phone: this.phone,
      bio: this.bio,
      socialUrl: this.socialUrl,
      avatarUrl: this.avatarUrl
    };

    this.profileService.updateProfile(profile).subscribe({
      next: () => this.toast.show('Profile updated!'),
      error: () => this.toast.show('Failed to update profile')
    });
  }

  changePassword(): void {
    if (!this.oldPassword || !this.newPassword) {
      this.toast.show('Please fill out both password fields.');
      return;
    }
    this.profileService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.toast.show('Password changed successfully.');
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.toast.show(err.error || 'Failed to change password.');
      }
    });
  }

  generateAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D47A1&color=fff&bold=true`;
  }
}