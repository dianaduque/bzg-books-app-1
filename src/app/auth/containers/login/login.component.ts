import { Component, OnInit, NgZone } from '@angular/core';
import { ILogin } from '../../models/user/auth';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import {Store, select} from "@ngrx/store";
import * as fromAuth from "../../reducers";
import * as Auth from "../../actions/auth";
import {MessagesService} from "../../../alerts/services/messages.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pending$ = this.store.pipe(select(fromAuth.getPending));
  error$ = this.store.pipe(select(fromAuth.getError));
  success$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private store: Store<fromAuth.State>, private msgService: MessagesService) { }

  ngOnInit() {
    this.error$.subscribe(
      error => {
        this.msgService.message({msg: "usuario o contraseña invalidad", type: 'error'})
      }
    )
  }

  auth(event : ILogin) {
    if(event) {
      this.store.dispatch(new Auth.Login());
      this.authService.login(event)
      .then(
        auth => {
          localStorage.setItem('bzgBooksApp', JSON.stringify(auth));
          this.store.dispatch(new Auth.LoginSuccess(auth.user.uid));
          this.router.navigate(['main']);
        },
        error => {
          this.store.dispatch(new Auth.LoginFailure(error));
        }
      );
    }
  }

  signWithGoogle(event) {
    if(event){
      this.store.dispatch(new Auth.Login());
      this.authService.signWithGoogle()
      .then(
        user => {
          localStorage.setItem('bzgBooksApp', JSON.stringify(user));
          this.zone.run(() => {
            this.store.dispatch(new Auth.LoginSuccess(user.user.uid));
            this.router.navigate(['main']);
          });          
        }
      ).catch(
        error => {
          this.store.dispatch(new Auth.LoginFailure(error));
        }
      );
    }
  }

}
