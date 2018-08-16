import { Component, OnInit, NgZone } from '@angular/core';
import { ILogin, Login } from '../../models/user/auth';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) {
     this.login = new Login();
    }



  login : ILogin;
  ngOnInit() {
  }

  signup() {
         
      this.authService.signup(this.login)
        .then(
          auth => {
            this.router.navigate(['/login']);
          },
          error => {
            alert("Error en el registro.");
          }
        );   
  }

}
