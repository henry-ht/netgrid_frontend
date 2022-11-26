import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent
],
exports: [
  FooterComponent,
  NavBarComponent
],
  imports: [
    CommonModule
  ]
})
export class PartsModule { }
