import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly FAVORITES_KEY = 'MY_FAVORITES';
  private favorites: string[] = [];

  constructor() {
    const storedFavorites = localStorage.getItem(this.FAVORITES_KEY);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  getFavorites(): string[] {
    return this.favorites;
  }

  toggleFavorite(pokemonId: string): void {
    const index = this.favorites.indexOf(pokemonId);
    if (index === -1) {
      this.favorites.push(pokemonId);
    } else {
      this.favorites.splice(index, 1);
    }

    // Guardar los cambios en el localStorage
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(this.favorites));
  }

  isFavorite(pokemonId: string): boolean {
    return this.favorites.includes(pokemonId);
  }
}
