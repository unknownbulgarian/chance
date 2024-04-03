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
import { MobileService } from './Services/mobile.service';
import { SettingsService } from './Services/settings.service';
import { LoadSettingsService } from './Services/load-settings.service';
import { ChatService } from './Services/chat.service';
import { ProxyService } from './Services/proxies.service';
import { SupportChatService } from './Services/support-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService, ProxyService]
})
export class AppComponent implements OnInit {
  constructor(private profileUserInfoService: ProfileUserInfoService, private editProfileSerice: EditProfileService, public particlesConfig: ParticlesConfig, private renderer: Renderer2, private element: ElementRef, public loopService: LoopService, public loginService: LoginService, public errorSuccessService: ErrorSuccessService, public sessionService: SessionService,
    public loadingService: LoadingService, public userInfoService: UserInfoService,
    public blankService: BlankService, private changeUserInfoService: ChangeUserInfoService, public mobileService: MobileService,
    public settingsService: SettingsService, private loadSettingsService: LoadSettingsService,
     public chatService: ChatService, private proxyService: ProxyService, public supportChatService : SupportChatService,
   ) { }

  body = document.body;

  ngOnInit(): Promise<void> {

    this.supportChatService.getMessages()
    setInterval(() => {
      this.supportChatService.getMessages();
  }, 10000);


    this.loadSettingsService.loadSettings()

    const isDarkTheme = localStorage.getItem('dark_theme')

    if (isDarkTheme) {
      if (isDarkTheme === 'true') {
        this.renderer.setStyle(this.body, 'backgroundColor', 'black')
      }
    }





    this.settingsService.isSettings$.subscribe((settings) => {
      if (settings) {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
        window.scroll(0, 0)
        this.blankService.enableBlank()
      } else {
        if (!this.chatService.isChatEnabled) {
          this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        }
        this.blankService.disableBlank()
      }
    })



    this.mobileService.isMenuToggled$.subscribe((menu) => {
      if (menu) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        if (!this.chatService.isChatEnabled) {
          this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        }
      }
    })

    this.profileUserInfoService.profile$.subscribe((profile) => {
      if (profile === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        if (!this.chatService.isChatEnabled) {
          this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        }
      }
    })

    this.profileUserInfoService.publicProfile$.subscribe((profile) => {
      if (profile === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        if (!this.chatService.isChatEnabled) {
          this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        }
      }
    })

    this.editProfileSerice.edit$.subscribe((edit) => {
      if (edit === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        if (!this.chatService.isChatEnabled) {
          this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
        }
        this.changeUserInfoService.user.isNewBio = ''
        this.changeUserInfoService.user.isNewImage = ''
        this.changeUserInfoService.user.isNewName = ''
        this.changeUserInfoService.user.isNewUsername = ''
        this.editProfileSerice.currentImage = ''

      }

      this.proxyService.proxyCheck()
    })

    /*this.loginService.isLogin$.subscribe((login) => {
      if (login === true) {
        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');
      } else {
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');
      }
    })*/

    window.addEventListener('load', AOS.refresh);

    AOS.init({
      once: true,
      startEvent: 'load'
    });

    document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
        AOS.init({ once: true, startEvent: 'load' })
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
