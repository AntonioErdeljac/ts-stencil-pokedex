export const paths = {
  pokemon: '/pokemon',
  profile: '/profile',
};

export const CDN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const CDN_EXTENSION = '.png';

export type PokemonType = {
  name: string;
  url: string;
}

export enum NetworkStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}