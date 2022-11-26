import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly notifier: ToastrService) { }

  public success(msj:string) {
    this.notifier.success( msj);
  }

  public warning(msj:string) {
    this.notifier.warning(msj);
  }

  public info(msj:string) {
    this.notifier.info( msj);
  }

  public error(msj:string) {
    this.notifier.error(msj);
  }
}
