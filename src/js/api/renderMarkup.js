import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { error, success } from '@pnotify/core';

import api from './apiService';
import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';
import { refs } from '../refs';
import img from '../components/input';

const { filmListGallery, mainSection, filmCard } = refs;
const posterUrl = 'https://image.tmdb.org/t/p/w500/';

export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    .then(result => {
      result.forEach(element => {
        element.poster_path = `${posterUrl}${element.poster_path}`;
      });
      renderMarkup(result);
    })
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
            text: `search successful:
             ${response.data.total_results} founded`,
            delay: 2000,
          });
        }
        return response.data.results;
      })
      .then(result => {
        result.forEach(element => {
          if (element.poster_path === null) {
            element.poster_path = img.NOPOSTER;
          } else {
            element.poster_path = `${posterUrl}${element.poster_path}`;
          }
        });
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
