import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';

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

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesListDebug = favorites;
      console.log('Favorites updated:', this.favoritesListDebug);
    });
  }

  confirmRemoval(item: string, index: number): void {
    if (confirm(`Are you sure you want to remove "${item}" from favorites?`)) {
      this.removeFromFavorites(item, index);
    }
  }

  removeFromFavorites(item: string, index: number): void {
    this.favoritesService.removeFromFavorites(item);
    this.favorites.splice(index, 1);
    this.toastMessage = `"${item}" removed from Favorites`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
