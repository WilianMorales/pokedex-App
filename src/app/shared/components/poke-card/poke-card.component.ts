import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPokemon } from '@interfaces/pokemon-page.interface';
import { LocalStorageService } from '@services/localStorage.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent {

  @Input() pokemons: IPokemon[] = [];
  @Input() classicMode: boolean = true;
  @Output() goToDetail = new EventEmitter<string>();

  link_gif = 'https://projectpokemon.org/images/normal-sprite/';
  link_png = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private localStorageService: LocalStorageService) { }

  // TODO: Metodo para concatenar 00 delante del id del pokemon.
  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }

  onClickDetail(name: string): void {
    this.goToDetail.emit(name);
  }

  toggleFavorite(id: number, name: string): void {
    if (id !== undefined) {
      this.localStorageService.toggleFavorite(id, name);
    }
  }

  isFavorite(id: number): boolean {
    return id !== undefined ? this.localStorageService.isFavorite(id) : false;
  }
}
