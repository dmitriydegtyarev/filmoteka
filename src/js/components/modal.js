import { refs } from '../refs.js';
//import api from '../api/apiService';
import { getFilmInModal } from '../api/renderMarkup';
//import regModal from '../components/regModal';
//import firebaseApi from '../components/firebase';

refs.filmListGallery.addEventListener('click', openModalWindow);

function openModalWindow(e) {
  if (e.target.nodeName !== 'IMG') return;

  refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
  refs.lightbox.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress);

  refs.lightbox.classList.add('is-open');

  resetModal();

  getFilmInModal(e);
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";

   
  


  //добавить в просмотренные или в список просмотра
  // refs.addWatchedBtn.addEventListener('click', onAddWatchedBtnClick);// Я закоментіл, бо заважала. Влад.
  // refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick); 
}


// function onAddWatchedBtnClick(id) {
//   //id = api.movieId();
//   const userPresent = localStorage.getItem('userInfo');
//   console.log('userPresent :>> ', userPresent);
//   if (!userPresent) {
//     regModal.openRegModalWindow();
//   }
 
//   firebaseApi.postWatchedData(id);

//   refs.addWatchedBtn.classList.add('press-btn');
//   refs.addWatchedBtn.textContent = 'Added to Watched';
//   refs.addWatchedBtn.disabled = true;
// }

// function onAddQueueBtnClick(id) {
//   // дописать логику
//   const userPresent = localStorage.getItem('userInfo');
//   console.log('userPresent :>> ', userPresent);
//   if (!userPresent) {
//     regModal.openRegModalWindow();
//   }
  
//   firebaseApi.postQueueData();

//   refs.addQueueBtn.classList.add('press-btn');
//   refs.addQueueBtn.textContent = 'Added to Queue';
//   refs.addQueueBtn.disabled = true;
// }

function onModalWindowCloseBtn() {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscPress);
  refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
  document.documentElement.style.overflow = 'scroll';
  document.body.scroll = "yes";
}

export function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onModalWindowCloseBtn();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onModalWindowCloseBtn();
  }
}

function resetModal() {
  refs.filmCard.innerHTML = '';
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
