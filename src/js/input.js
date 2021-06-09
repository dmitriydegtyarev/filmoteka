import fetchMovies from './fetchMovies';
import api from './api/axios';

export default function onInputSearch(e) {
  api.query = e.target.value;
  fetchMovies(api.query);
}
