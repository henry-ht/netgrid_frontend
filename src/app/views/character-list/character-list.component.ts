import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RequestService } from './../../core/services/request.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters:any = [];
  favorites:any = [];
  faStar = faStar;
  loadPage:boolean = false;

  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  get(){
    this.loadPage = true;
    this.request.get('https://rickandmortyapi.com/api/character', null, true)
    .subscribe({
      next: (data:any)=> {
        console.log(data)
        if (data.results.length) {
          this.characters = data.results;
        }
      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });
  }

  getFavorites(){
    this.loadPage = true;
    this.request.get('favorite')
    .subscribe({
      next: (data:any)=> {
        console.log('favorites: ', data)
        if (typeof(data.data) != "undefined") {
          this.favorites = data.data;
        }
        this.get();
      },
      error: () => { this.loadPage = false; this.get();},
    });
  }


  addFavorite(id:number){
    this.request.save('favorite', {
      'ref_api': id
    })
    .subscribe({
      next: (data:any)=> {

      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });
  }

  RemoteFavorite(id:number){
    this.request.delete('favorite/'+id)
    .subscribe({
      next: (data:any)=> {

      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });
  }
}
