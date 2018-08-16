import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {StoreModule} from "@ngrx/store";
import { LoginComponent } from './containers/login/login.component';
import { routes } from "./routes.auth";
import { LoginFormComponent } from './components/login-form/login-form.component';
import {reducers} from "./reducers";
import {AlertsModule} from "../alerts/alerts.module";
import { EmailComponent } from './components/login-email/login-email.component';
import { SignupComponent } from './components/register-account/register-account.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth',reducers),
    AlertsModule
  ],
  declarations: [LoginComponent, LoginFormComponent, EmailComponent, SignupComponent]
})
export class AuthModule { }
