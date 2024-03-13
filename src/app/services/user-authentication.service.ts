import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  setUser(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string {
    const user = this.getUser();
    return user ? user.id : null;
  }

  loginUser(email: string) {
    const httpPost = this.http.post(this.apiUrl, { email });

    httpPost.subscribe({
      next: (response) => {
        const user = {
          email: email,
          id: response['_id']
        };

        this.setUser(user);
      }
    });

    return httpPost;
  }
}

