import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { IPokemon } from '@interfaces/pokemon-page.interface';
import { LocalStorageService } from '@services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: IPokemon[] = [];
  types: IPokemon[] = [];

  @Output() typeSelected = new EventEmitter<string>();

  filteredPokemonList?: any[];

  selectedType: string = '';

  advance = 0;
  goBack = 0;
  btnActive: boolean = true;

  constructor(private pokemonService: PokemonService,
    private favoriteService: LocalStorageService) { }

  ngOnInit(): void {
    localStorage.removeItem('valor');
    this.loadPage();
    this.getType();
  }

  loadPage(): void {
    this.pokemonService.getPokemonPage()
      .subscribe((pokeList) => {
        this.pokemons = pokeList.results;
      });
  }


  getType() {
    this.pokemonService.getType()
      .subscribe(response => {
        this.types = response.results;
      },
        error => {
          console.log('Error al obtener los tipos de Pokémon', error);
        }
      );
  }

  getFavCount(): number {
    return this.favoriteService.getFavorites().length;
  }

  onTypeChange() {
    this.pokemonService.getPokemonByType(this.selectedType)
      .subscribe(data => {
        this.filteredPokemonList = data.pokemon.map((p: { results: any; }) => p.results)
        console.log(data);
      },
        error => {
          console.log('Error al obtener los Pokémones por tipo', error);
        })
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
