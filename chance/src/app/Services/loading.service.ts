import { Injectable } from "@angular/core";


@Injectable()
export class LoadingService {
    loaded: number = 0;
    miniLoader: number = 0;

    reset() {
        this.loaded = 0;
    }

    mimic(time: number) {
        this.loaded = 0;

        setTimeout(() => {
            this.loaded = 100;
        }, time);
    }


    resetMini() {
        this.loaded = 0;
    }

    mimicMini(time: number) {
        this.miniLoader = 0;

        setTimeout(() => {
            this.miniLoader = 100;
        }, time);
    }
}
