import { ProfileComponent } from './profile/profile.component';
import { AccessGuard } from '../core/guards/access.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CharacterListComponent } from './character-list/character-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full'
  },
  {
    path: 'character',
    component: CharacterListComponent,
    canActivate: [AccessGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AccessGuard]
  },
  {
    path: 'favorite',
    component: FavoriteListComponent,
    canActivate: [AccessGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule { }
