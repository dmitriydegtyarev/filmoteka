import api from './apiService';
import { Spinner } from 'spin.js';
import { modalSpinner, previewSpinner } from '../libs/spinner';

// import { previewSpinner, modalSpinner } from '../libs/spinner';

import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import changePath from '../components/changePathForPoster';

import showMessage from '../components/showMessage';

import getFilmGanres from '../components/getFilmGanres';
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
    //.then(getAllFilmsGanres)
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
      .then(getFullYear)
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
    .then(getFilmGanres)
    .then(renderFilmMarkup)
    .catch(error => console.log(error))
    .finally(() => spinner.stop(filmCard));
}
 

// function getAllFilmsGanres(results) {
//   const res=results.map(result => {
//     const { id, poster_path, original_title, name, genre_ids, fullYear1, fullYear2, vote_average } = result;
//     const genres = api.getGanres()
//       .then(arr => arr.filter(el => {
//         const elId = el.id;
//         //console.log('el.id :>> ', elId);
//         if (genre_ids.includes(elId)) {
//           console.log('el.name :>> ', el.name);
//           return el.name;
//         }
//       }))
//       //.then(console.log);
//     console.log('genres :>> ', genres);
//     return { id, poster_path, original_title, name, genres, fullYear1, fullYear2, vote_average };
//   });
  
//   console.log('newResultswithGanres :>> ', res);
  
// }

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
