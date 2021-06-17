import api from './apiService';
import { Spinner } from 'spin.js';
import { modalSpinner, previewSpinner } from '../libs/spinner';
import firebaseApi from '../components/firebase';

import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import { changePath, changeFilmPath } from '../components/changePathForPoster';

import showMessage from '../components/showMessage';

import getFilmGenres from '../components/getFilmGenres';
import getFullYear from '../components/getFullYear';

const { filmListGallery, filmCard, paginationList } = refs;

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(getFullYear)
    .then(getFilmsWithGanres)
    .then(result => {
      changePath(result);
      clearMarkup();
      renderMarkup(result);
    })
    .catch(error => console.log(error));
}

export function renderMoviesBySearchQuery(query) {
  if (query !== '') {
    api
      .getMovieOnSearchQuery(query)
      .then(response => {
        showMessage(response);
        return response.data.results;
      })
      .then(getFullYear)
      .then(getFilmsWithGanres)
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
  const spinner = new Spinner(modalSpinner);
  spinner.spin(filmCard);

  api.id = e.target.id;
  api
    .getMovieById()
    .then(response => response.data)
    .then(getFilmGenres)
    .then(result => {
      changeFilmPath(result);
      renderFilmMarkup(result);

      firebaseApi.findWatchedMovie(result.id).then(res => {
        addWatchedBtnEl.addEventListener('click', onAddWatchedBtnClick);
        if (res !== undefined) {
          addWatchedBtnEl.classList.add('press-btn');
          addWatchedBtnEl.textContent = 'Remove from Watched';
        }

        function onAddWatchedBtnClick() {
          firebaseApi.findWatchedMovie(result.id).then(matched => {
            if (matched !== undefined) {
              firebaseApi.deleteWatchedData(matched);
              addWatchedBtnEl.classList.remove('press-btn');
              addWatchedBtnEl.textContent = 'Add to Watched';
            } else {
              firebaseApi.postWatchedData(result);
              addWatchedBtnEl.classList.add('press-btn');
              addWatchedBtnEl.textContent = 'Remove from Watched';
            }
          });
        }
      });

      firebaseApi.findQueueMovie(result.id).then(res => {
        addQueueBtnEl.addEventListener('click', onAddQueueBtnClick);
        if (res !== undefined) {
          addQueueBtnEl.classList.add('press-btn');
          addQueueBtnEl.textContent = 'Remove from Queue';
        }

        function onAddQueueBtnClick() {
          firebaseApi.findQueueMovie(result.id).then(matched => {
            if (matched !== undefined) {
              firebaseApi.deleteQueueData(matched);
              addQueueBtnEl.classList.remove('press-btn');
              addQueueBtnEl.textContent = 'Add to Queue';
            } else {
              firebaseApi.postQueueData(result);
              addQueueBtnEl.classList.add('press-btn');
              addQueueBtnEl.textContent = 'Remove from Queue';
            }
          });
        }
      });
      const addWatchedBtnEl = document.querySelector('.add-watched_button');
      const addQueueBtnEl = document.querySelector('.add-queue_button');
    })
    .catch(error => console.log(error))
    .finally(() => spinner.stop(filmCard));
}

async function getFilmsWithGanres(results) {
  const allGanres = await api.getGanres();
  //console.log('allGanres :>> ', allGanres);
  return results.map(({ genre_ids, ...rest }) => ({
    genres: genre_ids.map(id => allGanres[id]).join(', '),
    ...rest,
  }));
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

export function clearMarkupPagination() {
  paginationList.innerHTML = '';
}

// api
//   .getShortInfoMovieById()
//   .then(response => console.log(response.data.results))
//   .catch(error => console.log(error));
