import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from 'firebase';
import { ILogin, Login } from '../../models/user/auth';
import { AuthService } from "../../services/auth/auth.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css'],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  error: any;
  login : ILogin;

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { 
    this.login = new Login();
  }

  ngOnInit() {
  }

  onSubmit() {    
    this.authService.login(this.login)
    .then(
      auth => {
        localStorage.setItem('bzgBooksApp2', JSON.stringify(auth));
        this.router.navigate(['main']);
      },
      error => {
      //  alert(error.message);
        this.error = error;
      }
    );
  }

}
