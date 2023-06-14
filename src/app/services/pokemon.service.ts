import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon, IPokemonResponse } from '@interfaces/pokemon-page.interface';
import { IPokemonDetails } from '@interfaces/pokemon.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private BASE_URL = 'https://pokeapi.co/api/v2'
  private limitPage = 20;
  offsetPage = 0;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      limit: this.limitPage,
      offset: this.offsetPage
    }
  }

  // TODO: Metodo para paginar la lista
  getPokemonPage(): Observable<IPokemonResponse> {
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/pokemon`, {
      params: this.params
    }).pipe(
      tap((response: IPokemonResponse) => response),
      tap((response) => {
        response.results.map((value: IPokemon) => {
          this.getPokemonDetail(value.name).subscribe(
            (res) => (value.status = res)
          )
        });
      })
    );
  }

  getPaginationPrevious(goback: number) {
    this.offsetPage = this.offsetPage - goback;

    if (this.offsetPage === 0) {
      localStorage.setItem('valor', 'stop');
    }

    const params = { ...this.params, offset: this.offsetPage };
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/pokemon`, {
      params
    }).pipe(
      tap((response: IPokemonResponse) => response),
      tap((response) => {
        response.results.map((value: IPokemon) => {
          this.getPokemonDetail(value.name).subscribe(
            (res) => (value.status = res)
          )
        });
      })
    );
  }

  getPaginationNext(advance: number) {
    this.offsetPage = this.offsetPage + advance;

    const params = { ...this.params, offset: this.offsetPage };
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/pokemon`, {
      params
    }).pipe(
      tap((response: IPokemonResponse) => response),
      tap((response) => {
        response.results.map((value: IPokemon) => {
          this.getPokemonDetail(value.name).subscribe(
            (res) => (value.status = res)
          )
        });
      })
    );
  }

  getPokemonDetail(name: number | string): Observable<IPokemonDetails> {
    return this.http.get<IPokemonDetails>(this.BASE_URL + '/pokemon/' + name);
  }

  getEvolutionChain(id: number): Observable<any> {
    return this.http.get<IPokemonDetails>(this.BASE_URL + '/evolution-chain/' + id);
  }

  getSpecies(name: string): Observable<any> {
    return this.http.get<IPokemonDetails>(this.BASE_URL + '/pokemon-species/' + name);
  }

  getType(){
    return this.http.get<IPokemonResponse>(this.BASE_URL + '/type');
  }

  getPokemonByType(type: string): Observable<any> {
    return this.http.get<any>(`${type}`);
  }

}
