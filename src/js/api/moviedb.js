import api from './axios';
import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';
import { refs } from '../refs';

const { filmListGallery } = refs;

api
  .getPopularMovies()
  .then(response => response.data.results)
  .then(result => renderMarkup(result))
  .catch(error => console.log(error));

api
  .getMovieOnSearchQuery((api.query = 'reacher'))
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

api
  .getMovieById((api.id = '75780'))
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  console.log(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};
