import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from "../../../reducers";
import { Observable } from "rxjs";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  stateAside$: Observable<string> = this.store.pipe(select(fromRoot.getShowSideNav));

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

}
