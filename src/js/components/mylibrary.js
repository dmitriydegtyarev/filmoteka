import { refs } from '../refs';
import moviesTemplate from '../../templates/film-list.hbs';
import firebaseApi from './firebase';
import changePath from './changePathForPoster';

const renderMarkup = result => {
  const markup = moviesTemplate(result);
  refs.filmListGallery.insertAdjacentHTML('afterbegin', markup);
};

refs.myWatchedBtn.addEventListener('click', onMyWatchedBtn);
refs.myQueueBtn.addEventListener('click', onMyQueueBtn);

function onMyWatchedBtn() {
  firebaseApi.getWatchedData().then(result => {
    changePath(result);
    refs.filmListGallery.innerHTML = '';
    renderMarkup(result);
  });
}

function onMyQueueBtn() {
  firebaseApi.getQueueData().then(result => {
    changePath(result);
    refs.filmListGallery.innerHTML = '';
    renderMarkup(result);
  });
}
