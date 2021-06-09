import { refs } from '../refs.js';
import filmCardTmp from '../../templates/film-card.hbs';

refs.filmListGallery.addEventListener('click', openModalWindow);
refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
refs.lightbox.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
    
   
function openModalWindow(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'LI') return;
    refs.lightbox.classList.add('is-open');
    appendFilmMarkup();
}

function fetchFilm(id){
    return fetch()
}

function appendFilmMarkup(film){
   refs.filmCard.insertAdjancentHTML('beforeend', filmCardTmp(film)); 
}

function onModalWindowCloseBtn() {
    refs.lightbox.classList.remove('is-open');
    refs.lightbox.removeEventListener('click', onOverlayClick);
    window.removeEventListener('keydown', onEscPress);
}

function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
        onModalWindowCloseBtn();
    }
}

function onEscPress(e) {
    if(e.code==='Escape'){
        onModalWindowCloseBtn();
    }
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);