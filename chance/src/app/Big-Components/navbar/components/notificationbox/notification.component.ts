import { Component, NgModule, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "src/app/Services/chat.service";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { GetPostInfoService } from "src/app/Services/getPost-Info.service";
import { LoadingService } from "src/app/Services/loading.service";
import { LoopService } from "src/app/Services/loop.service";
import { NavBarService } from "src/app/Services/navbar.service";
import { ProfilesService } from "src/app/Services/profiles.service";
import { SettingsService } from "src/app/Services/settings.service";
import { GlobalVars } from "src/app/utils/global";


@Component({
    selector: 'app-notification-box',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})

export class NotificationBoxComponent {

    constructor( private loadingService : LoadingService,
         private userInfoService : UserInfoService, private profileService : ProfilesService, 
         public settingsService : SettingsService, private getPostInfoService : GetPostInfoService, public chatService : ChatService, 
         public navBarService: NavBarService, public loopService: LoopService, public globalVars: GlobalVars, public router: Router) { }

    isNoti: number = 1;



    navigate(notification: any) {
        this.navBarService.disableNotification()
        if (notification.type === 'follow') {
            this.router.navigate(['/profiles/' + notification.username]);
        } else if (notification.type === 'chat_message') {
            this.router.navigate(['/chat']);
            this.loadingService.miniLoadedSubject.next(0)
            this.loopService.selectedUser = notification.username;
            this.navBarService.currentPhoto.next(notification.profile_photo)
            this.profileService.checkIfFollow(notification.username)
            this.loopService.getChat(notification.username)
            this.userInfoService.getPublicUserData(notification.username)
            this.loopService.callChat()
            
        } else {
            this.router.navigate(['/posts/' + notification.post_id]);
            this.getPostInfoService.getnfo(notification.post_id);
        }
    }


}