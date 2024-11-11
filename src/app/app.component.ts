import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DictionaryService } from './dictionary.service';
import { filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoritesService } from './favorites.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TranslateService } from '@ngx-translate/core';

interface Notification {
  id: number;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  word: string = '';
  wordDetails: any;
  favoritesPage: any;
  isFavorite: boolean = false;
  first: boolean = true;
  notificationMessage: string = '';
  showNotification: boolean = false;
  private notificationTimeout: any;
  private hideTimeout: any;
  signupPage: any;
  homePage: any;
  pipesPage: any;
  isDarkMode: boolean = false;
  lang: string = "en";
  name: string = 'username';

  resetFirst() {
    this.first = false;
  }

  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild(LoadingSpinnerComponent, { static: false }) loadingSpinner!: LoadingSpinnerComponent;

  constructor(
    private router: Router,
    private dictionaryService: DictionaryService,
    private favoritesService: FavoritesService,
    private renderer: Renderer2,
    private translate: TranslateService) {
      const browserLang = this.translate.getBrowserLang() ?? 'en';
      this.translate.use(browserLang.match(/en|tr/) ? browserLang : 'en');
    }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.name = username? username : "username";
    const savedTheme = localStorage.getItem('darkMode');
    if(savedTheme === 'true'){
      this.toggleDarkTheme();
    }
    const savedLang = localStorage.getItem('language');
    this.lang = savedLang ? savedLang : "en";
    this.translate.use(this.lang);
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.translate.use(this.lang);
      this.resetMatch();
      const match = this.router.url.match(/^\/en\/(.+)/);
      const searchTerm = match ? match[1] : '';
      if (searchTerm) {
        this.word = searchTerm.replace('%20', ' ');
        this.performSearch(searchTerm);
      }else if (searchTerm == '') {
        const username2 = localStorage.getItem('username');
        this.name = username2? username2 : "username";
        this.word = '';
        this.wordDetails = null;
        this.isFavorite = false;
        this.match();
      }
    });
  }

  changeLanguage(): void {
    if(this.lang == "en"){
      this.lang = "tr";
    }else{
      this.lang = "en";
    }
    this.translate.use(this.lang);
    localStorage.setItem('language', this.lang);
  }

  resetMatch(): void {
    this.favoritesPage = false;
    this.signupPage = false;
    this.pipesPage = false;
    this.homePage = false;
  }

  match(): void {
    const match2 = this.router.url.match(/favorites/);
    this.favoritesPage = match2 ? true : false;
    const match3 = this.router.url.match(/signup/);
    this.signupPage = match3 ? true : false;
    const match4 = this.router.url.match(/pipes/);
    this.pipesPage = match4 ? true : false;
    const match5 = this.router.url.match(/^\/$/);
    this.homePage = match5 ? true : false;
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToPipes(): void {
    this.router.navigate(['/pipes']);
  }
  
  addToFavorites(item: string): void {
    const addedMessage = this.translate.instant('NOTIFICATIONS.ADDED_TO_FAVORITES');
    const removedMessage = this.translate.instant('NOTIFICATIONS.REMOVED_FROM_FAVORITES');

    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(item);
      this.isFavorite = false;
      this.createNotification(removedMessage);
    } else {
      this.favoritesService.addToFavorites(item);
      this.isFavorite = true;
      this.createNotification(addedMessage);
    } 
  }

  createNotification(message: string): void {
    this.showNotification = false;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.hideTimeout = setTimeout(() => {
      this.notificationMessage = message;
      this.showNotification = true;
      this.notificationTimeout = setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    }, 50);
  }

  searchWord(word?: string): void {
    const searchTerm = word || this.word;
    if (searchTerm.trim()) {
      this.router.navigate(['/en', searchTerm]);
    }
  }

  performSearch(word: string): void {
    this.loadingSpinner.show();
    this.dictionaryService.getWordDetails(word).pipe(
      catchError(error => {
        console.error('Error fetching word details', error);
        this.createNotification('Error fetching word details. Please try again later.');
        this.wordDetails = null;
        return of(null);
      })
    ).subscribe((data) => {
      if (data) {
        this.wordDetails = data;
        this.isFavorite = this.favoritesService.getFavorites().some(fav => fav === this.wordDetails[0].word);
      }
      const timeout = setTimeout(() => {
        this.loadingSpinner.hide();
      }, 500);
    });
  }

  hasSynonyms(): boolean {
    if (!this.wordDetails || !this.wordDetails.length) {
      return false;
    }
    for (let detail of this.wordDetails) {
      for (let meaning of detail.meanings) {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          this.first = true;
          return true;
        }
      }
    }
    return false;
  }

  getIndex(i: number, j: number): number {
    let counter = 0;
    for (let k = 0; k < i; k++) {
      counter += this.wordDetails[k].meanings.length;
    }
    return counter + j + 1;
  }

  playAudio(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
    }
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
 }
}
