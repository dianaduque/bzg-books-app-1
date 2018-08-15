import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookListService } from "../../../books-main/services/list/book-list.service";
import { trigger, state, style, transition, animate, animation } from "@angular/animations";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as layout from "../../actions/layout";
import { User } from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";  
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CollectionService } from '../../../collections/services/collection.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
  animations: [
    trigger('popupAnimation', [
      state('closed', style({
        height: '0px',
        display: 'none'
      })),
      state('opened', style({
        height: '200px',
      })),
      transition('closed => opened', animate('90ms')),
      transition('opened => closed', animate('90ms'))
    ])
  ]
})
export class TopNavBarComponent implements OnInit {

  state:string;
  popupState:string;
  user: User;
  count: number;
  booksCount: number;

  constructor(private bookService: BookListService, private store: Store<fromRoot.State>, 
      private authFire: AngularFireAuth, private favService: FavoritesService,
      private collectionService: CollectionService) { 
      
    this.state = 'open';
    this.popupState = 'closed';
  }

  ngOnInit() {
    this.authFire.authState.subscribe(user => {this.user = user; console.log(user)})

    this.authFire.authState.subscribe(
      user => {          
        this.favService.listFavorites(user).valueChanges()
          .subscribe(
            list => {
              this.count = list.length;
            }
          )
        }
    );
    this.authFire.authState
    .subscribe(
      user => {          
        let listCollections =  this.collectionService.getListCollections().valueChanges()
        .subscribe(
          list => {
            let i = 0;
            let values = list.values();
            do
            {
              var col = values.next();
              if(!col.done){
                let books = col.value["books"];
                for(let book in books)
                  ++i;
              }
            }while(!col.done)
            this.booksCount = i;
          }
        )
      })
  }

  open() {
    if(this.state === 'close')
    {
      this.state = 'open';
      this.store.dispatch(new layout.OpenSideNav());
    }
    else
    {
      this.state = 'close';
      this.store.dispatch(new layout.CloseSideNav());
    }
  }

  searchBooks(text:string) {
    this.bookService.searchBooks(text, 0, 20);
  }

  onNavImageClick(){
    if(this.popupState == 'closed')
      this.popupState = 'opened'
    else
      this.popupState = 'closed'
  }
}
