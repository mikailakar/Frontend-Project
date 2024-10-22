import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DictionaryService } from './dictionary.service';
import { filter } from 'rxjs/operators';
import { FavoritesService } from './favorites.service';

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
  first = true;
  notificationMessage: string = '';
  showNotification: boolean = false;
  notifNumber: number = 0;

  resetFirst() {
    this.first = !this.first;
  }

  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private router: Router,
    private dictionaryService: DictionaryService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.favoritesPage = false;
      const match = this.router.url.match(/^\/en\/(.+)/);
      const searchTerm = match ? match[1] : '';
      if (searchTerm) {
        this.word = searchTerm.replace('%20', ' ');
        this.performSearch(searchTerm);
      }else if (searchTerm == '') {
        this.word = '';
        this.wordDetails = null;
        this.isFavorite = false;
        const match2 = this.router.url.match(/favorites/);
        this.favoritesPage = match2 ? true : false;
      }
    });
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
  
  addToFavorites(item: string): void {
    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(item);
      this.isFavorite = false;
      this.notificationMessage = 'Removed from favorites!';
    } else {
      this.favoritesService.addToFavorites(item);
      this.isFavorite = true;
      this.notificationMessage = 'Added to favorites!';
    }
    this.showNotification = true;
    this.notifNumber++;
    setTimeout(() => {
      this.notifNumber--;
      if(this.notifNumber === 0){
        this.showNotification = false;
      }
    }, 2000);    
  }

  CloseNotif(){
    this.notifNumber--;
    if(this.notifNumber === 0){
      this.showNotification = false;
    }
  }

  searchWord(word?: string): void {
    const searchTerm = word || this.word;
    if (searchTerm.trim()) {
      this.router.navigate(['/en', searchTerm]);
    }
  }

  performSearch(word: string): void {
    this.dictionaryService.getWordDetails(word).subscribe(
      (data) => {
        this.wordDetails = data;
        this.isFavorite = this.favoritesService.getFavorites().some(fav => fav === this.wordDetails[0].word);
      },
      (error) => {
        console.error('Error fetching word details', error);
        this.wordDetails = null;
      }
    );
  }

  hasSynonyms(): boolean {
    if (!this.wordDetails || !this.wordDetails.length) {
      return false;
    }
    for (let detail of this.wordDetails) {
      for (let meaning of detail.meanings) {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
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
}
