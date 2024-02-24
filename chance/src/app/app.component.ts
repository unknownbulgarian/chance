import { Component } from '@angular/core';
import { LoginService } from './Services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent {
  constructor(public loginService: LoginService) {}

}
