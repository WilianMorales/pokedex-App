import { IPokemonDetails } from "./pokemon.interface";

export interface IPokemonResponse {
    count:    number;
    next:     string;
    previous: string;
    results:  IPokemon[];
}

export interface IPokemon {
    name:  string;
    url:   string;
    order: number;
    status: IPokemonDetails;
    isFavorite?: boolean;
}
