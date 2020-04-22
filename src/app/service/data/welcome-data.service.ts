import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {
  constructor(private httpClient: HttpClient) {}

  executeHelloWorldBeanService() {
    return this.httpClient.get<HelloWorldBean>(
      'http://localhost:8080/hello-world-bean'
    );
  }

  executeHelloWorldServiceWithPathVariable(name) {
    return this.httpClient.get<HelloWorldBean>(
      'http://localhost:8080/hello-world/path-variable/' + name
    );
  }

  // createBasicAuthenticationHttpHeader() {
  //   let username = 'default_user';
  //   let password = 'S6Rdj4ynZCJACHf';
  //   let basicAuthHeaderString =
  //     'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
}
