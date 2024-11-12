import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'en/:word', component: AppComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pipes', component: AppComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
