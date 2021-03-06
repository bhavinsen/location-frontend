import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserlocationComponent } from './userlocation/userlocation.component';

const routes: Routes = [
  { "path": "", component: HomeComponent },
  { "path": "user-location", component: UserlocationComponent },
  { "path": "login", component: LoginComponent },
  { "path": "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
