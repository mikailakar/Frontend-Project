import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites.service';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PipesDemoComponent } from './pipes-demo/pipes-demo.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
