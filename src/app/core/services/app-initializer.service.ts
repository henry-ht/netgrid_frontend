import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  toke:String = '';
  constructor(private user:UserService, private storage:StorageService) { }

  Init() {
    return new Promise<void>((resolve, reject) => {
      this.toke = this.storage.getInLocal('app_token');
      if(this.toke){
        this.user.setIsLoggedIn(true);
      }
      resolve();
    });
  }
}
