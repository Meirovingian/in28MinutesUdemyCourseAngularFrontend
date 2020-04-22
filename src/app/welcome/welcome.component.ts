import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  message: string =
    'This is the welcoming message integrated to the welcome component';
  name: string = '';
  customizedMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params['name'];
    console.log(name);
  }

  getWelcomeMessage(): void {
    this.service.executeHelloWorldBeanService().subscribe(
      (response) => this.handleSuccessfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParameter() {
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      (response) => this.handleSuccessfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response) {
    // console.log(response.message);
    this.customizedMessage = response.message;
  }

  handleErrorResponse(error) {
    console.log(error);
    this.customizedMessage = error.error.message;
  }
}
