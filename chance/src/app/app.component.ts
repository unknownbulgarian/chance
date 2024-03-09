import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';
import { ErrorSuccessService } from './Services/error-success.service';
import { SessionService } from './Services/session.service';
import { LoadingService } from './Services/loading.service';
import { UserInfoService } from './Services/get-userinfo.service';
import { BlankService } from './Services/blank.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  constructor(public loginService: LoginService, public errorSuccessService: ErrorSuccessService, private sessionService: SessionService,
    public loadingService: LoadingService, public userInfoService: UserInfoService,
    public blankService: BlankService) { }

  ngOnInit(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      try {
        await this.sessionService.checkIfLogged();
      } catch (error) {
        console.error('Error checking if logged:', error);
      } finally {
        setTimeout(() => {
        //<app-loading *ngIf="loadingService.loaded === 0"></app-loading>
        this.userInfoService.getUserData()
 
        }, 1500);
        resolve();
      }
    });
  }


}
