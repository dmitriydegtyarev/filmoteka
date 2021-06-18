import { refs } from '../refs.js';

refs.registrationBtn.addEventListener('click', openRegModalWindow);

function openRegModalWindow(e) {
  refs.regLightbox.classList.add('is-open');
  refs.regModalCloseBtn.addEventListener('click', onRegModalWindowCloseBtn);
  refs.regLightbox.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress);
}

function onRegModalWindowCloseBtn(e) {
  refs.regLightbox.classList.remove('is-open');
  refs.regLightbox.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscPress);
  refs.regModalCloseBtn.removeEventListener('click', onRegModalWindowCloseBtn);
}

function onOverlayClick(e) {
  // console.log('e.target :>> ', e.target);
  // console.log('e.currentTarget :>> ', e.currentTarget);
  if (e.target === e.currentTarget) {
    onRegModalWindowCloseBtn();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onRegModalWindowCloseBtn();
  }
}

export default {
  openRegModalWindow,
  onRegModalWindowCloseBtn,
};
