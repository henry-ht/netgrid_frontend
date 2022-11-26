import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged:boolean = false;
  private data:Object = {};

  private status$ = new BehaviorSubject<boolean>(this.isLogged);
  private data$   = new BehaviorSubject<Object>(this.data);

  constructor() {
  }

  setData(data:Object) {
    this.data = data;
    this.data$.next(this.data);
  }

  getData$(): Observable<Object> {
    return this.data$.asObservable();
  }

  getDataValue():Object {
    return this.data$.value;
  }

  setIsLoggedIn(date:boolean) {
    this.isLogged = date;
    this.status$.next(this.isLogged);
  }

  isLoggedIn$(): Observable<boolean> {
    return this.status$.asObservable();
  }

  public isLoggedInValue():boolean {
    return this.status$.value;
  }
}
