import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon, IPokemonResponse } from '@interfaces/pokemon-page.interface';
import { IPokemonDetail } from '@interfaces/pokemon.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  private BASE_URL = 'https://pokeapi.co/api/v2'
  private _pokemons: any[] = [];
  private _next: string = '';
  private limitPage = 50;
  offsetPage = 0;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      limit: this.limitPage,
      offset: this.offsetPage
    }
  }

  getPokemons(): Observable<IPokemon[]> {
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/pokemon`, {
      params: this.params
    }).pipe(
      map(value => value.results)
    )
  }

  getPokemonDetail(pokemon: number | string): Observable<IPokemonDetail> {
    return this.http.get<IPokemonDetail>(this.BASE_URL + '/pokemon/' + pokemon);
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }


}
