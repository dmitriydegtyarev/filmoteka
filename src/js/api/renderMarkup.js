import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { error, success } from '@pnotify/core';

import api from './apiService';
import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';
import { refs } from '../refs';

const { filmListGallery, mainSection, filmCard } = refs;

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => renderMarkup(result))
    .catch(error => console.log(error));
}

export function renderMovisBySearchQuery(query) {
  if (query !== '') {
    api
      .getMovieOnSearchQuery(query)
      .then(response => {
        if (response.data.results.length === 0) {
          error({
            text: 'Search result not successful. Enter the correct movie name and try again...',
            type: 'error',
            delay: 2000,
          });
        } else {
          success({
            text: 'search successful',
            delay: 2000,
          });
        }
        return response.data.results;
      })
      .then(result => {
        filmListGallery.innerHTML = '';
        renderMarkup(result);
      })
      .catch(error => console.log(error));
  } else {
    filmListGallery.innerHTML = '';
    renderPopularMovie();
  }
}

export function renderMovieById(id) {
  console.log('renderMovieById');
}

export function getMovieId(event) {
  api.id = event.target.id;
  api
    .getMovieById()
    .then(response => {
      console.log(response.data.id);
      return response.data.id;
    })
    // .then(result => renderFilmMarkup(result))
    .catch(error => console.log(error));
}

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

const renderFilmMarkup = result => {
  const markup = movieTemplate(result);
  filmCard.insertAdjancentHTML('beforeend', markup);
};

mainSection.addEventListener('click', getMovieId);
