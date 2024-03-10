import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class LoadingService {
  public loadedSubject = new BehaviorSubject<number>(0);
  loaded$: Observable<number> = this.loadedSubject.asObservable();

  public miniLoadedSubject = new BehaviorSubject<number>(0);
  miniLoaded$: Observable<number> = this.miniLoadedSubject.asObservable();

  

  reset(num : number) {
    this.loadedSubject.next(num);
  }

  mimic(num : number, time: number) {
    this.reset(num);

    setTimeout(() => {
      this.loadedSubject.next(100);
    }, time);
  }

  resetMini(num : number) {
    this.miniLoadedSubject.next(num);
  }

  mimicMini(num: number,time: number) {
    this.resetMini(num);

    setTimeout(() => {
      this.miniLoadedSubject.next(100);
    }, time);
  }
}
