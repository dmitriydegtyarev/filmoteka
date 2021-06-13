import axios from 'axios';
import { renderPopularMovie } from './renderMarkup';
import { renderPagination } from '../components/pagination';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJjZmE2MzcxZjJiNGM1MWE4ZGJiNjc0ZGJhMmJkMyIsInN1YiI6IjYwYmNiYzNmZWE4NGM3MDAyYWU3YTE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.anozZCItdqcbHyQtoH8Fm8ne3QlJGCSzSiJGIz6YtsQ';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

class GetMovi {
  constructor() {
    this.page = 1;
    this.ganres = [];
    this.searchQuery = '';
    this.id = '';
    this.basePosterPath = 'https://image.tmdb.org/t/p/w500/';
    this.init();
  }

  async init() {
    await this.getGanres();
    renderPopularMovie();
    renderPagination();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get movieId() {
    return this.id;
  }

  set movieId(newId) {
    this.id = newId;
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
    return await axios.get(`/trending/movie/day?page=${this.page}`);
  }

  async getMovieOnSearchQuery(query) {
    return await axios.get(`/search/movie?query=${this.searchQuery}&page=${this.page}`);
  }

  async getMovieById(id) {
    return await axios.get(`/movie/${this.id}`);
  }

  async getShortInfoMovieById(id) {
    return await axios.get(`/movie/${this.id}/videos`);
  }
}

const api = new GetMovi();

export default api;
