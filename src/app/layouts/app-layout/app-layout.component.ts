import { ActiveDisabledService } from './../../core/services/active-disabled.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  menuToggle:boolean = false;
  constructor(private menuChange$:ActiveDisabledService) {
    this.menuChange$.getStatus$()
      .subscribe((data:boolean) => {
        this.menuToggle = data;
      });
   }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.menuChange$.setStatus(false);
  }
}
