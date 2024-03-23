import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable()
export class MobileService{

    public isMenuToggled = new BehaviorSubject<boolean>(false);
    isMenuToggled$: Observable<boolean> = this.isMenuToggled.asObservable();

    toggleMenu() {
        const menu = this.isMenuToggled.getValue()
        this.isMenuToggled.next(!menu)
    }

    enableMenu() {
        this.isMenuToggled.next(true)
    }

    disableMenu() {
        this.isMenuToggled.next(false)
    }

}