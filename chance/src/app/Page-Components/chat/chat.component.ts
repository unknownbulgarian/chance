import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { LoadingService } from "src/app/Services/loading.service";
import { ChatService } from "src/app/Services/chat.service";
import { GlobalVars } from "src/app/utils/global";
import { LoopService } from "src/app/Services/loop.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ProfilesService } from "src/app/Services/profiles.service";
import { loadSlim } from "tsparticles-slim";
import { Container, Engine } from "tsparticles-engine";
import { ParticlesConfig } from "src/app/utils/particles";
import { NavBarService } from "src/app/Services/navbar.service";
import { SettingsService } from "src/app/Services/settings.service";
import { ErrorSuccessService } from "src/app/Services/error-success.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-account',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
    @ViewChild('message') messageTextArea!: ElementRef;
    @ViewChild('message2') messageTextArea2!: ElementRef;
    @ViewChild('middleContainer') middleContainerRef!: ElementRef;
    @ViewChild('middleContainer2') middleContainerRef2!: ElementRef;



    getFollowingInterval: any
    getRequestsInterval: any



    autoScroll: boolean = true;


    toggleAutoScroll() {
        this.autoScroll = !this.autoScroll
    }


    constructor(public title : Title, public settingsService: SettingsService, public navBarService: NavBarService, public particlesConfig: ParticlesConfig, private renderer: Renderer2, private element: ElementRef, public router: Router, public loginService: LoginService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService,
        public chatService: ChatService, public globalVars: GlobalVars, public loopService: LoopService, public userInfoService: UserInfoService, public profilesService: ProfilesService,
        public errorSuccessService : ErrorSuccessService) { }


    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            if (this.autoScroll === true) {
                this.middleContainerRef.nativeElement.scrollTop = this.middleContainerRef.nativeElement.scrollHeight;
                this.middleContainerRef2.nativeElement.scrollTop = this.middleContainerRef2.nativeElement.scrollHeight;
            }
        } catch (err) { }
    }

    scrollTop() {
        window.scroll(0, 0)
    }



    ngOnInit(): void {

        this.title.setTitle('Chance - Chill & Discuss')

        if (this.loopService.selectedUser !== '') {
            this.loopService.getChat(this.loopService.selectedUser)
        }

        window.scroll(0, 0)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'hidden');


        this.chatService.isChatEnabled = true;
        this.loopService.usersMessages = []



        this.loaderService.loaded$.subscribe(loadedValue => {

            if (loadedValue !== 0) {
                this.chatService.getFollowing()
                this.chatService.getRequests()

                this.getFollowingInterval = setInterval(() => this.chatService.getFollowing(), 3000)
                this.getRequestsInterval = setInterval(() => this.chatService.getRequests(), 3000)
            }
        });

        this.navBarService.currentPhoto$.subscribe((photo) => {
            if (photo !== '') {
                this.chatService.theCurrentProfilePhoto = photo
            }
        })
    }


    sendMessage() {
        const message = this.messageTextArea.nativeElement.value;
  

        if (message !== '') {
            this.chatService.sendChat(message, this.loopService.selectedUser);
        }



        this.messageTextArea.nativeElement.value = '';

    }

    ngOnDestroy(): void {
        clearInterval(this.getFollowingInterval)
        clearInterval(this.getRequestsInterval)
        this.renderer.setStyle(this.element.nativeElement.offsetParent, 'overflow-y', 'visible');

        this.chatService.isChatEnabled = false
        clearInterval(this.loopService.chatLoop)
    }


    viewProfile() {

        this.router.navigate(['/profiles/' + this.userInfoService.publicUserData.prqkor])

    }


    clearChatInterval() {
        clearInterval(this.loopService.chatLoop)
    }


    particlesLoaded(container: Container): void {
    }

    async particlesInit(engine: Engine): Promise<void> {

        await loadSlim(engine);
    }



}