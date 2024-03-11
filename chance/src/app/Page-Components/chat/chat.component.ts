import { Component, NgModule, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { ProfileUserInfoService } from "src/app/Services/profile-userinfo.service";
import { LoadingService } from "src/app/Services/loading.service";
import { ChatService } from "src/app/Services/chat.service";


@Component({
    selector: 'app-account',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {

    constructor(public loginService: LoginService, public profileUserInfoService: ProfileUserInfoService, public loaderService: LoadingService,
        public chatService: ChatService) { }

    isFollowing: boolean = false;
    isRequests: boolean = false;

    ngOnInit(): void {


        this.loaderService.loaded$.subscribe(loadedValue => {
            if (loadedValue !== 0) {
                this.chatService.getFollowing()
                this.chatService.getRequests()
            }
        });
    }


}