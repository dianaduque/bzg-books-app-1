import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, animation } from "@angular/animations";
import { User } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";


@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.css'],
  animations: [
    trigger('asideAnimation', [
      state('close', style({
        width: '50px'
      })),
      state('open', style({
        width: '300px'
      })),
      transition('open => close', animate('100ms ease-out')),
      transition('close => open', animate('100ms ease-in'))
    ])
  ]
})
export class AsideLeftComponent implements OnInit {

  user: User;
  @Input() asideState: string;

  constructor(private authFire: AngularFireAuth) { }

  ngOnInit() {
    this.authFire.authState
      .subscribe(
        user => {
          this.user = user;
        }
      )
  }

}
