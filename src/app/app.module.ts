import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites.service';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PipesDemoComponent } from './pipes-demo/pipes-demo.component'; // Adjust the path accordingly

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    PipesDemoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
