import api from './axios';
import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';
import { refs } from '../refs';

const { filmListGallery } = refs;

function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

function renderMovisBySearchQuery() {
  api
    .getMovieOnSearchQuery((api.query = 'taxi'))
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

function renderOneMovieById() {
  api
    .getMovieById((api.id = '75780'))
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

// api.getGanres().then(response => console.log(response.data.genres));

// api
//   .getPopularMovies()
//   .then(response => response.data.results)
//   .then(result => renderMarkup(result))
//   .catch(error => console.log(error));

// api
//   .getMovieOnSearchQuery((api.query = 'reacher'))
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error));

// api
//   .getMovieById((api.id = '75780'))
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error));

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

renderPopularMovie();

// renderMovisBySearchQuery();

// renderOneMovieById();

api
  .getPopularMovies()
  .then(response => console.log(response.data.results))
  .then({ genre_ids });
