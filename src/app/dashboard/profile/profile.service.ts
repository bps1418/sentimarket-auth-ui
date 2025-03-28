import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile } from '../../models/user-profile';
import { ApiEndpoints } from '../../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiEndpoints.Users.ME);
  }

  updateProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(ApiEndpoints.Users.ME, profile);
  }

  uploadAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(ApiEndpoints.Users.UPLOAD_AVATAR, formData, { responseType: 'text' });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<string> {
    const payload = { oldPassword, newPassword };
    return this.http.put(ApiEndpoints.Auth.CHANGE_PASSWORD, payload, { responseType: 'text' });
  }
}