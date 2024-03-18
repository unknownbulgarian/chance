import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './Services/login.service';
import { ErrorSuccessService } from './Services/error-success.service';
import { SessionService } from './Services/session.service';
import { LoadingService } from './Services/loading.service';
import { UserInfoService } from './Services/get-userinfo.service';
import { BlankService } from './Services/blank.service';
import { LoopService } from './Services/loop.service';
import * as AOS from 'aos'
import { ParticlesConfig } from './utils/particles';
import { EditProfileService } from './Services/edit-profile.service';
import { ProfileUserInfoService } from './Services/profile-userinfo.service';
import { ChangeUserInfoService } from './Services/change-userinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  constructor(private profileUserInfoService: ProfileUserInfoService, private editProfileSerice: EditProfileService, public particlesConfig: ParticlesConfig, private renderer: Renderer2, private element: ElementRef, public loopService: LoopService, public loginService: LoginService, public errorSuccessService: ErrorSuccessService, private sessionService: SessionService,
    public loadingService: LoadingService, public userInfoService: UserInfoService,
    public blankService: BlankService, private changeUserInfoService : ChangeUserInfoService) { }

  ngOnInit(): Promise<void> {

    this.profileUserInfoService.profile$.subscribe((profile) => {
      if (profile === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
      }
    })

    this.profileUserInfoService.publicProfile$.subscribe((profile) => {
      if (profile === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
      }
    })

    this.editProfileSerice.edit$.subscribe((edit) => {
      if (edit === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        this.changeUserInfoService.user.isNewBio = ''
        this.changeUserInfoService.user.isNewImage = ''
        this.changeUserInfoService.user.isNewName = ''
        this.changeUserInfoService.user.isNewUsername = ''
        this.editProfileSerice.currentImage = ''
      }
    })

    this.loginService.isLogin$.subscribe((login) => {
      if (login === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
      }
    })

    document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
        AOS.init({ once: true })
      }
    }

    return new Promise<void>(async (resolve) => {
      this.loopService.notifications()
      setInterval(() => this.loopService.call(), 10000);
      try {
        await this.sessionService.checkIfLogged();
      } catch (error) {
        console.error('Error checking if logged:', error);
      } finally {
        setTimeout(() => {
          //<app-loading *ngIf="(loadingService.loaded$ | async) === 0"></app-loading>
          this.loadingService.mimic(0, 1000)
          this.userInfoService.getUserData()
        }, 1500);
        resolve();
      }
    });
  }



}
