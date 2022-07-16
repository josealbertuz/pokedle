export type PokemonPaginatedResponse = {
    count:    number;
    next:     string;
    previous: null;
    results:  PokemonPaginated[];
}

export type PokemonPaginated = {
    name: string;
    url:  string;
}