import { NotificationService } from './../../core/services/notification.service';
import { RequestService } from './../../core/services/request.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent {

  characters:any = [];
  favorites:any = [];
  faTrash = faTrash;
  prePage:string = "";
  nextPage:string = 'https://rickandmortyapi.com/api/character/';
  loadPage:boolean = false;
  @ViewChild('scrollElement') scrollElement: ElementRef;

  constructor(private request: RequestService, private noti:NotificationService) {}

  ngOnInit(): void {
    this.getFavorites();
  }
  idsFavorites(): string{
    let favoriteString:string = this.favorites.map(favorite=>favorite.ref_api).join(",");

    return favoriteString;
  }

  get(){
    if(this.prePage != this.nextPage){
      this.loadPage = true;
      this.request.get(this.nextPage+this.idsFavorites(), null, true)
      .subscribe({
        next: (data:any)=> {
          if(this.favorites.length == 1){
            this.characters.push(data);
          }else{
            if (data.length) {
              for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                  let element = data[key];
                  this.characters.push(element);
                }
              }
            }
          }

        },
        error: () => { this.loadPage = false},
        complete: () => {this.loadPage = false}
      });

    }
  }

  getFavorites(){
    this.loadPage = true;
    this.request.get('favorite')
    .subscribe({
      next: (data:any)=> {
        if (typeof(data.data) != "undefined") {

          for (const key in data.data) {
            if (Object.prototype.hasOwnProperty.call(data.data, key)) {
              const element = data.data[key];
              this.favorites.push(element);
            }
          }
        }
        this.get();
      },
      error: () => { this.loadPage = false; this.get();},
    });
  }

  RemoteFavorite(id:number){
    let ref_api:number = 0;
    this.loadPage = true;
    for (const key in this.favorites) {
      if (Object.prototype.hasOwnProperty.call(this.favorites, key)) {
        const element = this.favorites[key];
        if(element.ref_api == String(id)){
          ref_api = element.id;
        }element
      }
    }
    this.request.delete('favorite/'+ref_api)
    .subscribe({
      next: (data:any)=> {
        if(data.status == true){
          this.noti.success(data.message);
          this.characters = [];
          this.favorites = [];
          this.getFavorites();
        }
        this.loadPage = false
      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });
  }

}
