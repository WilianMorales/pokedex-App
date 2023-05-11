import { Component, OnInit } from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { IPokemon } from '@interfaces/pokemon-page.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons!: IPokemon[];
  advance = 0;
  goBack = 0;
  btnActive: boolean = true;

  classicMode: boolean = true;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    localStorage.removeItem('valor');
    this.loadPage();
  }

  loadPage(): void {
    this.pokemonService.getPokemonPage().subscribe((pokeList) => {
      this.pokemons = pokeList.results;
    });
  }

  onPrevious(): void {
    this.goBack = 20;
    this.pokemonService.getPaginationPrevious(this.goBack)
      .subscribe(res => {
        this.pokemons = res.results;

        if (localStorage.getItem('valor') === 'stop') {
          this.btnActive = true;
        }
      })
  }

  onNext(): void {
    this.advance = 20;

    this.pokemonService.getPaginationNext(this.advance)
      .subscribe(res => {
        this.pokemons = res.results
      });

    localStorage.removeItem('valor');
    this.btnActive = false;
  }

}
