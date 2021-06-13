import { refs } from '../refs.js';
//import api from '../api/apiService';
import { getFilmInModal } from '../api/renderMarkup';

refs.filmListGallery.addEventListener('click', openModalWindow);

function openModalWindow(e) {
  if (e.target.nodeName !== 'IMG') return;

  refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
  refs.lightbox.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress);

  refs.lightbox.classList.add('is-open');

  resetModal();

  getFilmInModal(e); 
}

//добавить в просмотренные или в список просмотра
// refs.addWatchedBtn.addEventListener('click', onAddWatchedBtnClick);// Я закоментіл, бо заважала. Влад.
// refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick); Я закоментіл, бо заважала. Влад.

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
  refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
}

export function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onModalWindowCloseBtn();
  }
}

export function onEscPress(e) {
  if (e.code === 'Escape') {
    onModalWindowCloseBtn();
  }
}

function resetModal() {
  refs.filmCard.innerHTML = '';
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
