import { refs } from '../refs.js';
import api from '../api/axios';
import filmCardTmp from '../../templates/film-card.hbs';

//откритие/закрытие модалки
refs.filmListGallery.addEventListener('click', openModalWindow);
refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
refs.lightbox.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
//добавить в просмотренные или в список просмотра
refs.addWatchedBtn.addEventListener('click', onAddWatchedBtnClick);
refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick);

function openModalWindow(e) {
  // e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  refs.lightbox.classList.add('is-open');
  const imgId = e.target.id;
  console.log('e.target.Id :>> ', imgId);
  //api.id = e.target.movieId;
  
  //return api.getMovieById(imgId);
  //fetchFilm();
}

// function fetchFilm(id) {
//   return api.getMovieById().then(renderFilmMarkup);
// }

function renderFilmMarkup(film) {
  refs.filmCard.insertAdjancentHTML('beforeend', filmCardTmp(film));
}

function onAddWatchedBtnClick(id) {
  // дописать логику

  refs.addWatchedBtn.classList.add('press-btn');
  refs.addWatchedBtn.textContent = 'Added to Watched';
  refs.addWatchedBtn.disabled = true;
}

function onAddQueueBtnClick(id) {
  // дописать логику
  refs.addQueueBtn.classList.add('press-btn');
  refs.addQueueBtn.textContent = 'Added to Queue';
  refs.addQueueBtn.disabled = true;
}

function onModalWindowCloseBtn() {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscPress);
}

function onOverlayClick(e) {
  console.log('e.target :>> ', e.target);
  console.log('e.currentTarget :>> ', e.currentTarget);
  if (e.target === e.currentTarget) {
    onModalWindowCloseBtn();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onModalWindowCloseBtn();
  }
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
