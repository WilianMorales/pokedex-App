import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoritePokemon } from '@interfaces/favorite-pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly FAVORITES_KEY = 'MY_FAVORITES';
  private favorites: FavoritePokemon[] = [];

  private favoritesSubject = new BehaviorSubject<FavoritePokemon[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    const storedFavorites = localStorage.getItem(this.FAVORITES_KEY);
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    this.favoritesSubject.next(this.favorites);
  }

  getFavorites(): FavoritePokemon[] {
    return [...this.favorites];
  }

  toggleFavorite(id: number, name: string): boolean {
    const index = this.favorites.findIndex(p => p.id === id);

    if (index === -1) {
      this.favorites.push({ id, name });
      this.save();
      return true;
    } else {
      this.favorites.splice(index, 1);
      this.save();
      return false;
    }
  }

  private save(): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(p => p.id === id);
  }

}
