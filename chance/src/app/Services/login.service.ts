import { Injectable } from "@angular/core";
import { BlankService } from "./blank.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoginService {

    public isLoginSubject = new BehaviorSubject<boolean>(false);
    isLogin$: Observable<boolean> = this.isLoginSubject.asObservable();



    constructor(public blankService: BlankService) { }

    setLogin() {
        const currentValue = this.isLoginSubject.getValue();
        this.isLoginSubject.next(!currentValue);
        console.log(currentValue)
        if(currentValue === false) {
            this.blankService.enableBlank()
        } else {
            this.blankService.disableBlank()
        }
    }

    disableLogin() {
        this.isLoginSubject.next(false)
        this.blankService.disableBlank()
    }

    enableLogin() {
        this.isLoginSubject.next(true)
        this.blankService.enableBlank()
    }

    get LoginState() {
        return  this.isLoginSubject.getValue();
    }
}