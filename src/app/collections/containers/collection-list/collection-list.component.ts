import { Component, OnInit, Input } from '@angular/core';
import { ICollection } from '../../models/collection';
import {CollectionService} from '../../services/collection.service';
import { User } from '../../../auth/models/user/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor(private collectionService:CollectionService,  private authFire: AngularFireAuth) { 
  }

  ngOnInit() {

  }

  newCollection(event : ICollection) {
    if(event) {
      this.collectionService.newCollection(event);
    }
  }

}
