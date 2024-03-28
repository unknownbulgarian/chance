import { Injectable } from "@angular/core";
import { SettingsService } from "./settings.service";


@Injectable()
export class LoadSettingsService{

    //in the future it will be saved in database

    constructor(private settingsService : SettingsService) {}

    isDarkTheme = localStorage.getItem('dark_theme')
    isNotifications = localStorage.getItem('notifications')

    loadSettings() {
        if(this.isDarkTheme) {
            if(this.isDarkTheme === 'true') {
                this.settingsService.isDarkTheme = true
            } else {
                this.settingsService.isDarkTheme = false
            }
        }

        if(this.isNotifications) {
            if(this.isNotifications === 'true') {
                this.settingsService.isNotifications = true
            } else {
                this.settingsService.isNotifications = false
            }
        }

    }

    removeSettings() {
        if(this.isDarkTheme) {
            localStorage.removeItem('dark_theme')
        }
        if(this.isNotifications) {
            localStorage.removeItem('notifications')
        }
    }

}