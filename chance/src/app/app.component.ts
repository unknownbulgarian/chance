import { Component } from '@angular/core';
import { LoginService } from './Services/login.service';
import { ErrorSuccessService } from './Services/error-success.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent {
  constructor(public loginService: LoginService, public errorSuccessService: ErrorSuccessService) {}

}
