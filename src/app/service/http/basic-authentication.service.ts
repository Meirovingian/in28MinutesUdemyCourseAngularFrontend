import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';

export const TOKEN_KEY = 'token';
export const AUTHENTICATED_USER_KEY = 'authenticatedUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate() {}

  executeBasicAuthenticationService(username, password) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader(
      username,
      password
    );
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });
    return this.httpClient
      .get<AngularBasicAuthenticationBean>(`${API_URL}/basicauth `, {
        headers,
      })
      .pipe(
        map((data) =>
          this.preserveSession(data, username, basicAuthHeaderString)
        )
      );
  }

  private preserveSession(
    data: AngularBasicAuthenticationBean,
    username: string,
    bAH: string
  ): AngularBasicAuthenticationBean {
    sessionStorage.setItem(AUTHENTICATED_USER_KEY, username);
    sessionStorage.setItem(TOKEN_KEY, bAH);
    return data;
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(AUTHENTICATED_USER_KEY);
  }

  getAuthenticationToken(): string {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem(TOKEN_KEY);
  }

  createBasicAuthenticationHttpHeader(username, password) {
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }
}

export class AngularBasicAuthenticationBean {
  constructor(public message: string) {}
}
