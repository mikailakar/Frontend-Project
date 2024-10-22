import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites.service';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
