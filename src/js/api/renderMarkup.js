import api from './apiService';

import moviesTemplate from '../../templates/film-list.hbs';
// import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import changePath from '../components/changePathForPoster';
import showMessage from '../libs/pnotify';

import showMassage from '../components/showMessage';

const { filmListGallery, mainSection, filmCard } = refs;

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => {
      changePath(result);
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
        filmListGallery.innerHTML = '';
        renderMarkup(result);
      })
      .catch(error => console.log(error));
  } else {
    renderPopularMovie();
  }
}

// export function renderMovieById(id) {
//   console.log('renderMovieById');
// }

// export function getFilmInModal(e) {
//   api.id = e.target.id;
//   api
//     .getMovieById()
//     .then(response => {
//       console.log(response.data);
//       return response.data;
//     })
//     .then(renderFilmMarkup)
//     .catch(error => console.log(error));

//   // api
//   //   .getShortInfoMovieById()
//   //   .then(response => console.log(response.data.results))
//   //   .catch(error => console.log(error));
// }

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

// const renderFilmMarkup = film => {
//   const markup = movieTemplate(film);
//   filmCard.insertAdjancentHTML('beforeend', markup);
// };

//mainSection.addEventListener('click', getMovieId);

export function clearMarkup() {
  filmListGallery.innerHTML = '';
}
