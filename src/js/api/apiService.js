import axios from 'axios';
import { renderPopularMovie, clearMarkup, clearMarkupPagination } from './renderMarkup';
import { renderPagination } from '../components/pagination';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJjZmE2MzcxZjJiNGM1MWE4ZGJiNjc0ZGJhMmJkMyIsInN1YiI6IjYwYmNiYzNmZWE4NGM3MDAyYWU3YTE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.anozZCItdqcbHyQtoH8Fm8ne3QlJGCSzSiJGIz6YtsQ';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

class GetMovi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.id = '';
    this.basePosterPath = 'https://image.tmdb.org/t/p/w500';
    this.init();
  }

  async init() {
    clearMarkup();
    // clearMarkupPagination();
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
    if (this.ganres) {
      return this.ganres;
    } else {
      const response = await axios.get('/genre/movie/list');
      this.ganres = {};
      response.data.genres.forEach(({ id, name }) => {
        this.ganres[id] = name;
      });
      return this.ganres;
    }
  }

  resetPage() {
    this.page = 1;
  }

  async getPopularMovies() {
    return await axios.get(`/trending/movie/day?page=${this.page}`);
  }

  async getMovieOnSearchQuery(query) {
    return await axios.get(`/search/movie?query=${this.searchQuery}&page=${this.page}`);
  }

  async getMovieById() {
    let response = await axios.get(`/movie/${this.id}`);
    response.data.trailers = await (await api.getShortInfoMovieById()).data.results;
    return response;
  }

  async getShortInfoMovieById() {
    return await axios.get(`/movie/${this.id}/videos`);
  }
}

const api = new GetMovi();

export default api;
