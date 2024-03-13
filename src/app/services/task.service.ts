import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';

  constructor(private http: HttpClient, private authService: UserAuthenticationService) { }

  getTask(taskId: string | null): Observable<any> {
    const headers = new HttpHeaders().set('user-id', this.authService.getUserId());

    return this.http.get(`${this.apiUrl}/${taskId}`, { headers });
  }

  getUserTasks(): Observable<any> {
    const headers = new HttpHeaders().set('user-id', this.authService.getUserId());

    return this.http.get(`${this.apiUrl}`, { headers });
  }

  postTask(task: any): Observable<any> {
    const headers = new HttpHeaders().set('user-id', this.authService.getUserId());

    return this.http.post(`${this.apiUrl}`, task, { headers });
  }
}
