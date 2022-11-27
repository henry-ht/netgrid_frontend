import { ActiveDisabledService } from './../../core/services/active-disabled.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  menuStatus:boolean = false;

  constructor(private menuChange$:ActiveDisabledService) {
    this.menuChange$.getStatus$()
      .subscribe((data:boolean) => {
        this.menuStatus = data;
      });
  }

  ngOnInit(): void {
  }

  onSideBar() {
    this.menuStatus = !this.menuStatus;
    this.menuChange$.setStatus(this.menuStatus);
  }
}
