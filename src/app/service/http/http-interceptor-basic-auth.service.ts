import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  constructor(private authenticationService: BasicAuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let bAH: string = this.authenticationService.getAuthenticationToken();
    let username: string = this.authenticationService.getAuthenticatedUser();
    if (bAH && username) {
      request = request.clone({
        setHeaders: {
          Authorization: bAH,
        },
      });
    }

    return next.handle(request);
  }
}
