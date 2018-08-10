import { Component, OnInit, Input } from '@angular/core';
import { ICollection } from '../../models/collection';
import {CollectionService} from '../../services/collection.service';
import { User } from '../../../auth/models/user/user';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  @Input() user: User;

  constructor(private collectionService:CollectionService) { 
  }

  ngOnInit() {
  }

  newCollection(event : ICollection) {
    console.log(this.user);
    if(event) {
      this.collectionService.newCollection(event,this.user);
    }
  }

}
