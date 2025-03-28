import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class PortfolioService {

  constructor(private http: HttpClient) {}

  getPositions(): Observable<any[]> {
    return this.http.get<any[]>(ApiEndpoints.Robinhood.POSITIONS);
  }
}
