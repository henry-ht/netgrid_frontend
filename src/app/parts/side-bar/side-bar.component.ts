import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { faHome, faStar, faUser} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  faHome = faHome;
  faStar = faStar;
  faUser  = faUser;
  name: string = "";
  shopSelected:any = {};
  protected ngUnsubscribe:Subject<void> = new Subject<void>();
  shops:any = [];

  listItems = [
    {
      name: "characters",
      url: "/character",
      icon: faHome
    },
    {
      name: "favorites",
      url: "/favorite",
      icon: faStar
    },
    {
      name: "profile",
      url: "/profile",
      icon: faUser
    },
  ]
  constructor(private request:RequestService, private user:UserService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile(){
    this.request.get('profile')
      .subscribe({
        next: (data:any)=> {
          if (typeof(data.data) != "undefined") {
            this.name = data.data.name;
            this.user.setData(data.data);
            this.user.setIsLoggedIn(true);
          }
        },
        error: () => { },
        complete: () => {}
      });
  }

}
