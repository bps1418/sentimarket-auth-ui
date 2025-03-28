import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenManagerService {
  private apiUrl = 'http://localhost:8080';
 
  constructor(private http: HttpClient) {}

  triggerDownload(token: string): Observable<any> {
    return this.http.post(this.apiUrl+'/api/robinhood/DownloadPositions', { token });
  }
}
