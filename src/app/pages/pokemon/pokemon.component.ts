import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
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
            this.getEvolution();
          }, error => console.log('Error Occurred:', error));
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.pokemonService.getSpecies(this.pokemon.name)
        .subscribe(response => {
          const id = this.getId(response.evolution_chain.url);
          this.subscription = this.pokemonService.getEvolutionChain(id)
            .subscribe(
              response => this.extractEvolutions(response.chain)
            )
        })
    }
  }

  extractEvolutions(chain: any) {
    let current = chain;

    this.pokemon.evolutions.push({
      id: this.getId(current.species.url),
      name: current.species.name
    });

    if (current.evolves_to.length) {
      this.extractEvolutions(current.evolves_to[0]);
    }
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

  goBack(): void {
    this.router.navigateByUrl('/pokemon');
  }

}
