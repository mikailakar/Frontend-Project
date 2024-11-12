import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<string[]>(this.favorites);

  favorites$ = this.favoritesSubject.asObservable();

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
    this.favoritesSubject.next(this.favorites);
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
