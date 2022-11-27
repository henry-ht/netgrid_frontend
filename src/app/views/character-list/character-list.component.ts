import { NotificationService } from './../../core/services/notification.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RequestService } from './../../core/services/request.service';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters:any = [];
  favorites:any = [];
  faStar = faStar;
  prePage:string = "";
  nextPage:string = 'https://rickandmortyapi.com/api/character';
  loadPage:boolean = false;
  @ViewChild('scrollElement') scrollElement: ElementRef;

  constructor(private request: RequestService, private noti:NotificationService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  get(){
    if(this.prePage != this.nextPage){
      this.loadPage = true;
      this.request.get(this.nextPage, null, true)
      .subscribe({
        next: (data:any)=> {
          if (data.results.length) {
            this.prePage = this.nextPage;
            this.nextPage = data.info.next;
            for (const key in data.results) {
              if (Object.prototype.hasOwnProperty.call(data.results, key)) {
                let element = data.results[key];
                this.characters.push(element);

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
          this.favorites = data.data;
        }
        this.get();
      },
      error: () => { this.loadPage = false; this.get();},
    });
  }


  addFavorite(id:number){
    this.loadPage = true;
    this.request.save('favorite', {
      'ref_api': id
    })
    .subscribe({
      next: (data:any)=> {
        if(data.status == true){
          this.noti.success(data.message);
        }
        this.loadPage = false
      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
        var rect = this.scrollElement.nativeElement.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

          if((elemTop >= 0) && (elemBottom <= window.innerHeight))   {
            if(this.loadPage == false){
              this.get();
            }
        }
  }

}
