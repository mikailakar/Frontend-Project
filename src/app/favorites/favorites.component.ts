import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  favoritesListDebug: any[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private favoritesService: FavoritesService, private router: Router,
    private translate: TranslateService) {
      const browserLang = this.translate.getBrowserLang() ?? 'en';
      this.translate.use(browserLang.match(/en|tr/) ? browserLang : 'en');
    }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
    const savedLang = localStorage.getItem('language');
    this.translate.use(savedLang ? savedLang : "en");
    /*this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesListDebug = favorites;
      console.log('Favorites updated:', this.favoritesListDebug);
    });*/
  }

  navigateToWord(word: string) {
    this.router.navigate([`/en/${word}`]);
  }

  confirmRemoval(item: string, index: number): void {
    this.translate.get('CONFIRM.REMOVE', { item }).subscribe((message: string) => {
      if (confirm(message)) {
        this.removeFromFavorites(item, index);
      }
    });
  }

  removeFromFavorites(item: string, index: number): void {
    const removed = this.translate.instant('NOTIFICATIONS.REMOVED', { item });
    this.favoritesService.removeFromFavorites(item);
    this.favorites.splice(index, 1);
    this.toastMessage = removed;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
