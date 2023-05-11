import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  links = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    const { name } = this.activatedRoute.snapshot.params;

    this.pokemonService.getPokemonDetail(name)
      .subscribe(pokemon => {
        console.log(pokemon);
      })
      
  }

  ngOnInit(): void {
    localStorage.removeItem('valor');
  }

  goBack(): void {
    this.location.back();
  }

}
