import { Component, OnInit, Input } from '@angular/core';
import { ICollection } from '../../models/collection';
import { ActivatedRoute, Params } from "@angular/router";
import {CollectionService} from '../../services/collection.service';
import { User } from '../../../auth/models/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  listCollections: Observable<any[]>;
  bookCollections: Observable<any[]>;
  @Input()  status: string;

  constructor(private route: ActivatedRoute, private collectionService:CollectionService,  private authFire: AngularFireAuth) { 
    this.listCollections = null;
    this.bookCollections = null;
    this.status = "collectionView";
  }

  ngOnInit() {
    this.status = this.route.snapshot.data['collectionView'];
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

  newCollection(event : ICollection) {
    if(event) {
      this.collectionService.newCollection(event);
    }
  }

  click(key: string){
    console.log(status);
    if(status == "booksView")
      this.status = "collectionView";
    else
      this.status = "booksView";
  }

}
