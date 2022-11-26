import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private noti:NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          event = event.clone({body: this.modifyBody(event.body)});
      }
      return event;
  }));
  }

  private modifyBody(body:any) {
    let msg = '';
    console.log('"que vienes a buscar')
    if(body){
      switch (body['status']) {
        case 'error':
          this.printMsj(body);
          break;

        case 500:
            this.noti.error('Servidor no encontrado');
          break;

        case 'warning':
          this.printMsj(body);
          break;
      }
    }

    return body;
  }

  printMsj(body:any){
    this.noti.error(body['error']);

    // for (const key in body['error']) {
    //   if (Object.prototype.hasOwnProperty.call(body['message'], key)) {
    //     const element = body['message'][key];
    //     for (const key in element) {
    //       if (Object.prototype.hasOwnProperty.call(element, key)) {
    //         const msj = element[key];
    //         if(body['status'] == 'error'){
    //           this.noti.error(msj);
    //         }else{
    //           this.noti.warning(msj);
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
