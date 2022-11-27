import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    SideBarComponent
],
exports: [
  FooterComponent,
  NavBarComponent,
  SideBarComponent,

],
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule
  ]
})
export class PartsModule { }
