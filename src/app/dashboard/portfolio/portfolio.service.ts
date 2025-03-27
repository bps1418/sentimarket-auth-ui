import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private apiUrl = 'http://localhost:8080/api/robinhood/positions';

  constructor(private http: HttpClient) {}

  getPositions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
