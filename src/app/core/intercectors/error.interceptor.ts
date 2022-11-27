import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private noti:NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(error => {
        if(typeof(error.error.message) == "string"){
          this.noti.error(error.error.message);
        }else if(typeof(error.error.message) == "object"){
          for (const key in error.error.message) {
            if (Object.prototype.hasOwnProperty.call(error.error.message, key)) {
              const element = error.error.message[key];
              for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) {
                  const msj = element[key];
                    this.noti.error(msj);
                }
              }
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
