import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  addToFavorites(item: any): void {
    if (!this.favorites.some(fav => fav === item.word)) {
      this.favorites.push(item);
      this.saveFavorites();
    }
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  removeFromFavorites(item: any): void {
    this.favorites = this.favorites.filter(fav => fav !== item);
    this.saveFavorites();
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    } else {
      this.favorites = [];
    }
  }
}
