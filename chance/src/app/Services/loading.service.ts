import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class LoadingService {
  public loadedSubject = new BehaviorSubject<number>(0);
  loaded$: Observable<number> = this.loadedSubject.asObservable();

  public miniLoadedSubject = new BehaviorSubject<number>(0);
  miniLoaded$: Observable<number> = this.miniLoadedSubject.asObservable();

  

  reset() {
    this.loadedSubject.next(0);
  }

  mimic(time: number) {
    this.reset();

    setTimeout(() => {
      this.loadedSubject.next(100);
    }, time);
  }

  resetMini() {
    this.miniLoadedSubject.next(0);
  }

  mimicMini(time: number) {
    this.resetMini();

    setTimeout(() => {
      this.miniLoadedSubject.next(100);
    }, time);
  }
}
