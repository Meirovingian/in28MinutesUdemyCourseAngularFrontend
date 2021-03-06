import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/http/jwt-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public authenticationService: JwtAuthenticationService) {}

  isUserLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }
}
