import { Component, OnInit } from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { IPokemon } from '@interfaces/pokemon-page.interface';
import { Observable } from 'rxjs';
import { IPokemonDetail } from '@interfaces/pokemon.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    this.pokemonService.getPokemons().subscribe(res => {
      this.pokemons = res;
    }); 

  }


  getPokemon(list: IPokemon[]) {
    const arr: Observable<IPokemonDetail>[] = [];
    list.map((value: IPokemon) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
