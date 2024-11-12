import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DecodeJwtComponent } from './components/decode-jwt/decode-jwt.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserDateComponent } from './components/user-date/user-date.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'decode-jwt', component: DecodeJwtComponent },
  { path: 'user-role', component: UserRoleComponent },
  { path: 'user-date', component: UserDateComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
