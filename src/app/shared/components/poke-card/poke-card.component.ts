import { Component, Input } from '@angular/core';
import { IPokemon } from '@interfaces/pokemon-page.interface';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent {

  @Input() pokemons?: IPokemon[];

  constructor() { }

  // TODO: Metodo para concatenar 00 delante del id del pokemon.
  leadingZero(str: string | number, size = 2): string {
    let s = String(str);

    while (s.length < (size || 1)) {
      s = '0' + s;
    }
    return s;
  }

}
