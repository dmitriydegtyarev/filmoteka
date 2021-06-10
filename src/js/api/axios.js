import axios from 'axios';
import { renderPopularMovie } from './moviedb';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJjZmE2MzcxZjJiNGM1MWE4ZGJiNjc0ZGJhMmJkMyIsInN1YiI6IjYwYmNiYzNmZWE4NGM3MDAyYWU3YTE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.anozZCItdqcbHyQtoH8Fm8ne3QlJGCSzSiJGIz6YtsQ';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

class GetMovi {
  constructor() {
    this.page = 1;
    this.ganres = [];
    this.searchQuery = '';
    this.movieId = Number;
    this.init();
  }

  async init() {
    await this.getGanres();
    renderPopularMovie();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get id() {
    return this.movieId;
  }

  set id(newId) {
    this.movieId = newId;
  }

  get curentPage() {
    return this.page;
  }

  set curentPage(newPage) {
    this.page = newPage;
  }

  async getGanres() {
    const response = await axios.get('/genre/movie/list');
    return (this.ganres = response.data.genres);
  }

  async getPopularMovies() {
    return await axios.get(`/trending/all/day?page=${this.page}`);
  }

  async getMovieOnSearchQuery() {
    return await axios.get(`/search/movie?query=${this.searchQuery}&page=${this.page}`);
  }

  async getMovieById() {
    return await axios.get(`movie/${this.id}`);
  }

  // getMovieById = id => axios.get(`movie/${this.id}`);
}

const api = new GetMovi();

export default api;
