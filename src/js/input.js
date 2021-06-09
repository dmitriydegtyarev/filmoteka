// import fetchMovies from './fetchMovies';
import api from './api/axios';
import { renderMovisBySearchQuery } from './api/moviedb';

export default function onInputSearch(e) {
  api.query = e.target.value;
  renderMovisBySearchQuery(api.query);
}
