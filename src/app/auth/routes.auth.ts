import { Routes } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { EmailComponent } from './components/login-email/login-email.component';
import { SignupComponent } from './components/register-account/register-account.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent  
    },
    {
        path: 'signup',
        component: SignupComponent       
    },
    { 
        path: 'login-email', 
        component: EmailComponent },
];