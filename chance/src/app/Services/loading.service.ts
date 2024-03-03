import { Injectable } from "@angular/core";


@Injectable()
export class LoadingService {
    loaded : number = 0;

    mimic() {
        this.loaded = 0;

        setTimeout(() => {
            this.loaded = 100;
        }, 1600);
    }
}
