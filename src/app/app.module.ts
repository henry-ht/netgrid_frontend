import { PartsModule } from './parts/parts.module';
import { AppInitializerService } from './core/services/app-initializer.service';
import { ErrorInterceptor } from './core/intercectors/error.interceptor';
import { ResponseInterceptor } from './core/intercectors/response.interceptor';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { RequestInterceptor } from './core/intercectors/request.interceptor';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function AppInit(appInitService: AppInitializerService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    PartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    PartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppInit,
      multi: true,
      deps: [AppInitializerService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
