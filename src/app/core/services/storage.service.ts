import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private local:LocalStorageService, private session:SessionStorageService) { }

  setInLocal(KEY:string, value:string, expired:number = 0) {
    this.session.set(KEY, value, expired, 's');
  }

  removeLocal(KEY:string) {
    this.session.remove(KEY);
  }

  getInLocal(KEY:string):string {
    return this.session.get(KEY);
  }

  clearLocal() {
    this.session.clear();
  }
}
