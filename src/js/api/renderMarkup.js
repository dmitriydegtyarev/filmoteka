import api from './apiService';

import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import changePath from '../components/changePathForPoster';

import showMessage from '../components/showMessage';

import getFilmGanres from '../components/getFilmGanres';
// import getFilmYear from '../components/getFullYear';

const { filmListGallery, filmCard } = refs;

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => {
      changePath(result);
      clearMarkup();
      renderMarkup(result);
    })
    .catch(error => console.log(error));
}

export function renderMovisBySearchQuery(query) {
  if (query !== '') {
    api
      .getMovieOnSearchQuery(query)
      .then(response => {
        showMessage(response);
        return response.data.results;
      })
      .then(result => {
        changePath(result);
        clearMarkup();
        renderMarkup(result);
      })
      .catch(error => console.log(error));
  } else {
    renderPopularMovie();
  }
}

export function getFilmInModal(e) {
  api.id = e.target.id;
  api
    .getMovieById()
    .then(response => response.data)
    .then(getFilmGanres)
    .then(renderFilmMarkup)
    .catch(error => console.log(error));
}

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

const renderFilmMarkup = film => {
  const markup = movieTemplate(film);
  filmCard.insertAdjacentHTML('beforeend', markup);
};

export function clearMarkup() {
  filmListGallery.innerHTML = '';
}

// api
//   .getShortInfoMovieById()
//   .then(response => console.log(response.data.results))
//   .catch(error => console.log(error));

// function getFullYearFilm(date) {
//   const newDate = new Date(date);
//   const fullYear = newDate.getFullYear();
//   console.log('fullYear :>> ', fullYear);
//   return fullYear;
// }
