import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import {
  AUTHENTICATED_USER_KEY,
  TOKEN_KEY,
} from './basic-authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
    return this.httpClient
      .post<any>(`${API_URL}/authenticate`, {
        username,
        password,
      })
      .pipe(map((data) => this.preserveSession(data, username)));
  }

  private preserveSession(data: any, username: string): any {
    sessionStorage.setItem(AUTHENTICATED_USER_KEY, username);
    sessionStorage.setItem(TOKEN_KEY, `Bearer ${data.token}`);
    return data;
  }

  isUserLoggedIn(): boolean {
    return (
      sessionStorage.getItem(AUTHENTICATED_USER_KEY) !== null &&
      sessionStorage.getItem(TOKEN_KEY) !== null
    );
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
}
