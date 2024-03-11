import { Component, ElementRef, NgModule, OnInit, ViewChild } from "@angular/core";
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


@Component({
    selector: 'app-account',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
    @ViewChild('message') messageTextArea!: ElementRef;


    constructor(public router : Router, public loginService: LoginService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService,
        public chatService: ChatService, public globalVars: GlobalVars, public loopService: LoopService, public userInfoService: UserInfoService, public profilesService: ProfilesService) { }

  
 



   getFollowingInterval : any
   getRequestsInterval : any

   theCurrentUser : string = '';
   theCurrentProfilePhoto : string = '';


    ngOnInit(): void {
        this.chatService.isChatEnabled = true;
        this.loopService.usersMessages = []
        this.loopService.selectedUser$.subscribe((selectedUser: string) => {
            if (selectedUser !== '') {
                this.theCurrentUser = selectedUser
                this.loopService.getTheChat
            }
        });

        this.loaderService.loaded$.subscribe(loadedValue => {
            
            if (loadedValue !== 0) {
                this.chatService.getFollowing()
                this.chatService.getRequests()
       
                this.getFollowingInterval = setInterval(() => this.chatService.getFollowing(), 3000)
                this.getRequestsInterval = setInterval(() => this.chatService.getRequests(), 3000)
            }
        });
    }

    sendMessage() {
        const message = this.messageTextArea.nativeElement.value;
       
            this.chatService.sendChat(message, this.theCurrentUser);
    

        this.messageTextArea.nativeElement.value = '';
    }

    ngOnDestroy(): void {
        this.loopService.usersMessages = []
        clearInterval(this.loopService.getTheChat)
        clearInterval(this.getFollowingInterval)
        clearInterval(this.getRequestsInterval)
    }


}