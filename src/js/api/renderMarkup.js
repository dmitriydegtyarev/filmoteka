import api from './apiService';

import moviesTemplate from '../../templates/film-list.hbs';
import movieTemplate from '../../templates/film-card.hbs';

import { refs } from '../refs';

import changePath from '../components/changePathForPoster';

import showMessage from '../components/showMessage';
console.log(showMessage);
import getFilmGanres from '../components/getFilmGanres';
// import getFilmYear from '../components/getFullYear';

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
  if (query !== '')
  {
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
  } else
  {
    renderPopularMovie();
  }
}

export function getFilmInModal(e) {
  api.id = e.target.id;
  api
    .getMovieById()
    .then(response => {
      //console.log(response.data);
      return response.data;
    })
    .then(getFilmGanres)
    .then(renderFilmMarkup)
    .catch(error => console.log(error));

  // api
  //   .getShortInfoMovieById()
  //   .then(response => console.log(response.data.results))
  //   .catch(error => console.log(error));
}

// function getFilmGenres(data) {
//   const {
//     id,
//     poster_path,
//     original_title,
//     name,
//     first_air_date,
//     release_date,
//     vote_average,
//     vote_count,
//     popularity,
//     overview,
//     genres,
//     homepage,
//   } = data;
//   const allGenres = genres.map(genre => genre.name).join();
//   //console.log('object :>> ', genres.map(genre => genre.name).join());
//   //console.log({ id, poster_path, original_title, name, vote_average, vote_count, popularity, overview, allGenres, homepage });
//   return {
//     id,
//     poster_path,
//     original_title,
//     name,
//     first_air_date,
//     release_date,
//     vote_average,
//     vote_count,
//     popularity,
//     overview,
//     allGenres,
//     homepage,
//   };
// }

// function getFullYearFilm(date) {
//   const newDate = new Date(date);
//   const fullYear = newDate.getFullYear();
//   console.log('fullYear :>> ', fullYear);
//   return fullYear;
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
