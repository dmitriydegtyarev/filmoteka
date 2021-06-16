import api from './apiService';
import { Spinner } from 'spin.js';
import { modalSpinner, previewSpinner } from '../libs/spinner';
import firebaseApi from '../components/firebase';

// import { previewSpinner, modalSpinner } from '../libs/spinner';

import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import { changePath, changeFilmPath } from '../components/changePathForPoster';

import showMessage from '../components/showMessage';

import getFilmGenres from '../components/getFilmGenres';
import getFullYear from '../components/getFullYear';

const { filmListGallery, filmCard, filmListItem } = refs;

// function showModalSpeaner() {
//   const spinner = new Spinner(modalSpinner);
//   spinner.spin(filmCard);
// }

// export function showModalSpeaner() {
//   const spinner = new Spinner(modalSpinner);
//   spinner.spin(filmCard);
// }

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
      // console.log(firebaseApi.findWatchedMovie(result.id));
      const addWatchedBtnEl = document.querySelector('.add-watched_button');
      addWatchedBtnEl.addEventListener('click', onAddWatchedBtnClick);
      function onAddWatchedBtnClick() {
        firebaseApi.postWatchedData(result);
        addWatchedBtnEl.classList.add('press-btn');
        addWatchedBtnEl.textContent = 'Added to Watched';
        addWatchedBtnEl.disabled = true;
      }
      const addQueueBtnEl = document.querySelector('.add-queue_button');
      addQueueBtnEl.addEventListener('click', onAddQueueBtnClick);
      function onAddQueueBtnClick() {
        firebaseApi.postQueueData(result);
        addWatchedBtnEl.classList.add('press-btn');
        addWatchedBtnEl.textContent = 'Added to Queue';
        addWatchedBtnEl.disabled = true;
      }
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

// api
//   .getShortInfoMovieById()
//   .then(response => console.log(response.data.results))
//   .catch(error => console.log(error));
