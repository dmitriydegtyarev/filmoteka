import { refs } from '../refs';
import moviesTemplate from '../../templates/film-list.hbs';
import firebaseApi from './firebase';
import changePath from './changePathForPoster';
import { clearMarkup, getFilmsWithGanres } from '../api/renderMarkup';
import getFilmGenres from '../components/getFilmGenres';
import getFullYear from '../components/getFullYear';

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  refs.filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

refs.myWatchedBtn.addEventListener('click', onMyWatchedBtn);
refs.myQueueBtn.addEventListener('click', onMyQueueBtn);

function onMyWatchedBtn() {
  firebaseApi
    .getWatchedData()
    .then(result => {
      result.forEach(getFilmGenres);
      return result;
    })
    // .then(getFullYear)
    .then(result => {
      changePath(result);
      clearMarkup();
      renderMarkup(result);
    });
}

function onMyQueueBtn() {
  firebaseApi.getQueueData().then(result => {
    result.forEach(getFilmGenres);
    changePath(result);
    clearMarkup();
    renderMarkup(result);
  });
}
