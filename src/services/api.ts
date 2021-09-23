import axios from 'axios';

const URL_ROOT = 'https://pokeapi.co/api/v2/';

const api = axios.create({ baseURL: URL_ROOT});

export default api
