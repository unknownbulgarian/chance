import { Injectable} from "@angular/core";
import { BlankService } from "./blank.service";
import { BehaviorSubject, Observable } from "rxjs";



@Injectable()
export class SettingsService {



    public isSettings = new BehaviorSubject<boolean>(true);
    isSettings$: Observable<boolean> = this.isSettings.asObservable();

    //main settings
    isDarkTheme : boolean = false
    isNotifications : boolean = true



    constructor(private blankService: BlankService) { }

    toggle() {
        const value = this.isSettings.getValue()

        this.isSettings.next(!value)
    }

    enable() {
        this.isSettings.next(true)
    }

    disable() {
        this.isSettings.next(false)
    }

    toggleDarkTheme() {
        this.isDarkTheme = !this.isDarkTheme
    }

    toggleNotifications() {
        this.isNotifications = !this.isNotifications
    }

 

}