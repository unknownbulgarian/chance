import { Component, Renderer2, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { UserInfoService } from "src/app/Services/get-userinfo.service";
import { SettingsService } from "src/app/Services/settings.service";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})

export class SettingsComponent {

    isPage: number = 1
    account: number = 0

    expandHeight: number = 0;

    isDefault : number = 0;

    body = document.body;

    constructor(public settingsService: SettingsService, public userInfoService: UserInfoService, public renderer: Renderer2) { }



    toggleAccountDisplay(num: number, height: number): void {
        this.expandHeight = height
        this.account === num ? (this.account = 0) : (this.account = num);
    }

    getPasswords(value: string, which: number) {
        this.isDefault = 0
        switch (which) {
            case 1:
              this.settingsService.passwordInfo.oldPassword = value
                break;
            case 2:
                this.settingsService.passwordInfo.newPassword = value
                break;
            case 3:
                this.settingsService.passwordInfo.confirmNewPassword = value
                break;
        }

    }

    clearPasswords() {
        this.settingsService.passwordInfo.oldPassword = ''
        this.settingsService.passwordInfo.newPassword = ''
        this.settingsService.passwordInfo.confirmNewPassword = ''
        this.isDefault = 1;
    }

    ngAfterContentChecked(): void {
        if(this.account === 0 && this.isDefault === 0) {
            this.clearPasswords()
        }
    }




}