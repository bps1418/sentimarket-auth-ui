import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(ApiEndpoints.News.GET_ALL);
  }
}