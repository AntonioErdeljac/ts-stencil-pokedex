export { default as API } from './api'

export const getPokemonID = (url) => url.split('/pokemon/')[1].replace('/', '');