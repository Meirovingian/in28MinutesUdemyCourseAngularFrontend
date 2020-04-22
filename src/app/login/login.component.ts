import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import {
  BasicAuthenticationService,
  AngularBasicAuthenticationBean,
} from '../service/http/basic-authentication.service';
import { JwtAuthenticationService } from '../service/http/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'default_user';
  password: string = '';
  errorMessage: string = 'Invalid credentials !';
  invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: JwtAuthenticationService
  ) {}

  ngOnInit(): void {}

  doLogin(): void {
    this.router.navigate(['welcome', this.username]);
    this.invalidLogin = false;
  }

  handleJWTAuthentication() {
    this.authenticationService
      .authenticate(this.username, this.password)
      .subscribe(
        (data) => this.doLoginSuccess(data),
        (error) => this.doLoginFailure()
      );
  }

  doLoginSuccess(data: AngularBasicAuthenticationBean): void {
    console.log('it works well');
    this.router.navigate(['welcome', this.username]);
    this.invalidLogin = false;
  }

  doLoginFailure(): void {
    this.invalidLogin = true;
  }
}
