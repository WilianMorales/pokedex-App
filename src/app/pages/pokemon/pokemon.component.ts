import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  links = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  pokemon: any = null;

  subscriptions: Subscription[] = [];

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription)
  }

  ngOnInit(): void {
    localStorage.removeItem('valor');

    this.subscription = this.activatedRoute.params
      .subscribe(params => {
        this.subscription = this.pokemonService.getPokemonDetail(params.name)
          .subscribe(response => {
            this.pokemon = response;
          }, error => console.log('Error Occurred:', error));
      })
  }

  goBack(): void {
    this.location.back();
  }

}
