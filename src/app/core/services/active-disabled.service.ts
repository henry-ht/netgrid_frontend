import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveDisabledService {

  private status:boolean = true;
  private currentDate$ = new Subject<boolean>();

  constructor() { }

  setStatus(data:boolean) {
    this.status = data;
    this.currentDate$.next(data);
  }

  getStatus$(): Observable<boolean> {
    return this.currentDate$.asObservable();
  }
}
