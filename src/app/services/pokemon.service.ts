import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon, IPokemonResponse } from '@interfaces/pokemon-page.interface';
import { IPokemonDetails } from '@interfaces/pokemon.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  getPokemonPage(): Observable<IPokemon[]> {
    return this.http.get<IPokemonResponse[]>(`${this.BASE_URL}/pokemon`, {
      params: this.params
    }).pipe(
      map((res: any) => res.results.map((value: any) => ({
        name: value.name,
        order: value.url.split('/').filter(Boolean).pop()
      }))
      )
    );
  }

  getPaginationPrevious(goback: number) {
    this.offsetPage = this.offsetPage - goback;

    if (this.offsetPage === 0) {
      localStorage.setItem('valor', 'stop');
    }

    const params = { ...this.params, offset: this.offsetPage };
    return this.http.get<any>(`${this.BASE_URL}/pokemon`, {
      params
    }).pipe(
      map(response => response.results.map((value: any) => ({
        name: value.name,
        order: value.url.split('/').filter(Boolean).pop()
      }))
      )
    );
  }

  getPaginationNext(advance: number) {
    this.offsetPage = this.offsetPage + advance;

    const params = { ...this.params, offset: this.offsetPage };
    return this.http.get<any>(`${this.BASE_URL}/pokemon`, {
      params
    }).pipe(
      map(response => response.results.map((value: any) => ({
        name: value.name,
        order: value.url.split('/').filter(Boolean).pop()
      }))
      )
    );
  }

  

}
