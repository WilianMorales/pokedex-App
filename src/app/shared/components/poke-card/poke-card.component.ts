import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from '@interfaces/pokemon-page.interface';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent {

  @Input() pokemons?: IPokemon[];

  constructor(
    private pokemonService: PokemonService,
    private router: Router) { }

  // TODO: Metodo para concatenar 00 delante del id del pokemon.
  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }

  onClickDetail(name: string): void {
    this.pokemonService.getPokemonDetail(name)
      .subscribe(pokemon => {
        this.router.navigate(['/pokemon/', pokemon.name]);
      })
  }

}
