import api from './axios';
import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';
import { refs } from '../refs';

const { filmListGallery } = refs;

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

export function renderMovisBySearchQuery(query) {
  // if (query !== '') {
  //   api
  //     .getMovieOnSearchQuery()
  //     .then(response => {
  //       if (response.data.results.length === 0) {
  //         console.log('Выводим ошибку');
  //       } else {
  //         console.log('Очищаем ошибку');
  //       }
  //       return response.data.results;
  //     })
  api
    .getMovieOnSearchQuery()
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};
