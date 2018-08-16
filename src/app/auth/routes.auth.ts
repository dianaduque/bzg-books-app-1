import { Routes } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent  
    },
    {
        path: 'register',
        component: RegisterFormComponent       
    }
];