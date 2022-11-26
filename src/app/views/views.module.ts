import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewsRoutingModule } from './views-routing.module';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ProfileComponent } from './profile/profile.component';
import { CharacterListComponent } from './character-list/character-list.component';



@NgModule({
  declarations: [
    FavoriteListComponent,
    ProfileComponent,
    CharacterListComponent
  ],
  exports: [
    ViewsRoutingModule
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ViewsRoutingModule
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewsModule { }
