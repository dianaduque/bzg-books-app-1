import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../collections/services/collection.service';
import { AngularFireList } from 'angularfire2/database';
import { Collection, ICollection } from '../../../collections/models/collection';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  @Input() book: any;
  @Output() pushFavorite = new EventEmitter<any>();
  listCollections: Observable<any[]>;
  collectionSelected:ICollection;

  constructor(private collectionService:CollectionService, private authFire: AngularFireAuth) { 
    this.listCollections = null;
    this.collectionSelected = null;
  }

  ngOnInit() {    
    this.pushFavorite.emit(this.book);

    this.authFire.authState
    .subscribe(
      user => {          
        this.listCollections =  this.collectionService.getListCollections().snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          ));
        console.log(this.listCollections);
      }
    );   
  }

  addFavorite() {
    this.pushFavorite.emit(this.book);
  }

  addToCollection(event:any){
    console.log(event.target.value);
    this.collectionService.addBook(event.target.value,this.book);
  }

}
