import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular course project';
  message = 'Welcome to in28minutes learning !';

  constructor() { }

  ngOnInit(): void {

  }
  
}
