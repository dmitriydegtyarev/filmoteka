import axios from 'axios';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJjZmE2MzcxZjJiNGM1MWE4ZGJiNjc0ZGJhMmJkMyIsInN1YiI6IjYwYmNiYzNmZWE4NGM3MDAyYWU3YTE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.anozZCItdqcbHyQtoH8Fm8ne3QlJGCSzSiJGIz6YtsQ';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

class TheMovieDataBase {
  constructor() {
    this.searchQuery = '';
    this.movieId = null;
    this.page = 1;
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

  getMovieOnSearchQuery = query =>
    axios
      .get(`/search/movie/?query=${this.searchQuery}`)
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

  getMovieById = id => {
    axios
      .get(`/search/movie/?query=${this.id}`)
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  getPopularMovies = () =>
    axios
      .get('/trending/all/day')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
}

const api = new TheMovieDataBase();

export default api;
