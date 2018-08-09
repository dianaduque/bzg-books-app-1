import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ICollection, Collection } from '../../models/collection';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.css']
})
export class CollectionFormComponent implements OnInit {
  @Output() submitted = new EventEmitter();
  collection : ICollection;

  constructor() { 
    this.collection = new Collection();
  }

  ngOnInit() {
  }

  submit() {
    this.submitted.emit(this.collection);
  }

}
