import { NotificationService } from './core/services/notification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netgrid_frontend';

  constructor(private noti:NotificationService) {
    this.noti.error('hola');
  }
}
