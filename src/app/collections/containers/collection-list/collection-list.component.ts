import { Component, OnInit } from '@angular/core';
import { ICollection } from '../../models/collection';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  newCollection(event : ICollection) {
    if(event) {
      console.log("aqui vamos");
    }
  }

}
