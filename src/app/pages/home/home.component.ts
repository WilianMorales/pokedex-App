import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IPokemon } from '@interfaces/pokemon-page.interface';
import { PokemonService } from '@services/pokemon.service';
import { LocalStorageService } from '@services/localStorage.service';
import { ImageModeService } from '@services/imageMode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: IPokemon[] = [];
  types: IPokemon[] = [];
  filteredPokemonList: IPokemon[] = [];

  classicMode: boolean = true;

  selectedType: string = '';
  searchTerm: string = '';
  searchSubject = new Subject<string>();

  notFound: boolean = false;

  advance = 0;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: LocalStorageService,
    private imageModeService: ImageModeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadAllPokemons();
    this.getType();

    this.imageModeService.classicMode$.subscribe(mode => {
      this.classicMode = mode;
    });
    this.searchSubject.pipe(
      debounceTime(1000) // espera 300 ms luego de que el usuario deja de escribir
    ).subscribe(term => {
      this.performSearch(term);
    });
  }

  loadAllPokemons(): void {
    this.pokemonService.getPokemonPage(this.advance)
      .subscribe((pokeList) => {
        this.pokemons = pokeList.results;
        this.filteredPokemonList = this.pokemons;
      });
  }

  getType() {
    this.pokemonService.getType()
      .subscribe(response => {
        this.types = response.results.filter((type: any) =>
          type.name !== 'unknown' && type.name !== 'stellar'
        );
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
    if (this.selectedType === '') {
      this.loadAllPokemons();  // Si no hay tipo seleccionado, cargar todos los Pokémon
    } else {
      this.filterPokemonsByType();  // Filtrar los Pokémon por tipo seleccionado
    }
  }

  filterPokemonsByType(): void {
    // Filtra los Pokémon por tipo
    if (this.selectedType === '') {
      this.filteredPokemonList = this.pokemons;
      return;
    }

    this.pokemonService.getPokemonByType(this.selectedType)
      .subscribe(data => {
        const pokemonEntries = data.pokemon.map((p: any) => p.pokemon);
        const requests = pokemonEntries.map((p: any) =>
          this.pokemonService.getPokemonDetail(p.name)
        );

        forkJoin(requests).subscribe((results: any[]) => {
          this.filteredPokemonList = results.map(poke => ({
            name: poke.name,
            url: poke.url,
            order: poke.id,
            status: poke
          }));
        });
      });
  }


  onSearchChange(event: any): void {
    const term = event.target.value.toLowerCase();
    this.searchSubject.next(term);
  }

  performSearch(term: string): void {
    this.searchTerm = term;
    this.notFound = false;

    if (!this.searchTerm) {
      this.onTypeChange();
      return;
    }

    const sourceList = this.filteredPokemonList.length
      ? this.filteredPokemonList
      : this.pokemons;

    // Coincidencias parciales
    const partialMatches = sourceList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm)
    );

    if (partialMatches.length > 0) {
      this.filteredPokemonList = partialMatches;
      return;
    }

    this.pokemonService.getPokemonDetail(this.searchTerm).subscribe({
      next: (poke) => {
        this.filteredPokemonList = [{
          name: poke.name,
          url: poke.url,
          order: poke.id,
          status: poke
        }];
      },
      error: () => {
        this.filteredPokemonList = [];
        this.notFound = true;
      }
    });
  }

  shouldShowPagination(): boolean {
    return !this.searchTerm && !this.selectedType && !this.notFound;
  }

  onPrevious(): void {
    if (this.advance > 0) {
      this.advance -= 20;
      this.loadPokemonsPage();
    }
  }

  onNext(): void {
    this.advance += 20;
    this.loadPokemonsPage();
  }

  // Método para cargar Pokémon de la página actual
  loadPokemonsPage(): void {
    if (this.selectedType === '') {
      this.pokemonService.getPokemonPage(this.advance)
        .subscribe((pokeList) => {
          this.pokemons = pokeList.results;
          this.filteredPokemonList = this.pokemons;
        });
    } else {
      this.pokemonService.getPokemonByType(this.selectedType, this.advance)
        .subscribe(data => {
          const pokemonEntries = data.pokemon.map((p: any) => p.pokemon);
          this.pokemons = pokemonEntries;
          this.filteredPokemonList = this.pokemons;
        });
    }
  }

  onPokemonSelected(name: string): void {
    this.pokemonService.getPokemonDetail(name).subscribe(pokemon => {
      this.router.navigate(['/pokemon', pokemon.name]);
    });
  }

}
