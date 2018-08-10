import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../collections/services/collection.service';
import { AngularFireList } from 'angularfire2/database';
import { Collection } from '../../../collections/models/collection';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  @Input() book: any;
  @Output() pushFavorite = new EventEmitter<any>();
  listCollections: Observable<any[]>;

  constructor(private collectionService:CollectionService, private authFire: AngularFireAuth) { 
    this.listCollections = null;
  }

  ngOnInit() {
    

    this.pushFavorite.emit(this.book);

    this.authFire.authState
    .subscribe(
      user => {          
        this.listCollections =  this.collectionService.getListCollections().valueChanges();
        
      }
    );   



  }

  addFavorite() {
    this.pushFavorite.emit(this.book);
  }

}
