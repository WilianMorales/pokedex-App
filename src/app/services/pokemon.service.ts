import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon, IPokemonResponse } from '@interfaces/pokemon-page.interface';
import { IPokemonDetails } from '@interfaces/pokemon.interface';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private BASE_URL = 'https://pokeapi.co/api/v2'
  private limitPage = 20;
  offsetPage = 0;

  private typeCache = new Map<string, any>();
  private detailCache = new Map<string, IPokemonDetails>();

  constructor(private http: HttpClient) { }

  get params() {
    return {
      limit: this.limitPage,
      offset: this.offsetPage
    }
  }

  // TODO: Metodo para paginar la lista
  getPokemonPage(offset: number = 0): Observable<IPokemonResponse> {
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/pokemon`, {
      params: { ...this.params, offset: offset.toString() }
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
    if (this.detailCache.has(name.toString())) {
      return of(this.detailCache.get(name.toString())!);
    }

    return this.http.get<IPokemonDetails>(`${this.BASE_URL}/pokemon/${name}`).pipe(
      tap(detail => this.detailCache.set(name.toString(), detail))
    );
  }

  getEvolutionChain(id: number): Observable<any> {
    return this.http.get<IPokemonDetails>(`${this.BASE_URL}/evolution-chain/${id}`);
  }

  getSpecies(name: string): Observable<any> {
    return this.http.get<IPokemonDetails>(`${this.BASE_URL}/pokemon-species/${name}`);
  }

  getType() {
    return this.http.get<IPokemonResponse>(`${this.BASE_URL}/type`);
  }

  getPokemonByType(typeUrl: string, offset: number = 0): Observable<any> {
    const cacheKey = `${typeUrl}?offset=${offset}`;

    if (this.typeCache.has(cacheKey)) {
      return of(this.typeCache.get(cacheKey));
    }

    return this.http.get<any>(typeUrl, {
      params: { offset: offset.toString() }
    }).pipe(
      tap(data => this.typeCache.set(cacheKey, data))
    );
  }

}
