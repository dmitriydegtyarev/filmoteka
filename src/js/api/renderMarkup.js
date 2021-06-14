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
////1
export function renderPopularMovie() {
  api
    .getPopularMovies()
    .then(response => response.data.results)
    // .then(recognizesDateAndGanre)
    .then(results => {
      
      changePath(results);
      renderMarkup(results);
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

// console.log('object :>> ', api.getGanres());

// function recognizesDateAndGanre(results) {
//   results.map(result => {
//     const { id, poster_path, original_title, name, genre_ids, first_air_date, release_date, vote_average } = result;
//     const newDate1 = new Date(first_air_date);
//     const fullYear1 = newDate1.getFullYear();
//     const newDate2 = new Date(release_date);
//     const fullYear2 = newDate2.getFullYear();

//     const ganres = genre_ids.map(genre_id => {
//      const g= api.getGanres()
//         .then(arr => arr.find(el => {
//           console.log('el :>> ', el);
//           el.id === genre_id;
//           console.log('el.name :>> ', el.name);
//            return el.name;
//         }))
//        .then(el => {
//          if (el.name) {
//            console.log('object :>> ', el.name);
//            return el.name;
//          }
//        })
//       console.log('g :>> ', g);
//     }).join();
//     console.log('ganres :>> ', ganres);

//     return { id, poster_path, original_title, name, ganres, fullYear1, fullYear2, release_date, vote_average };
//   })
  
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
