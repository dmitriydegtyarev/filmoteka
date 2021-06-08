import { refs } from '../refs.js'

refs.filmListGallery.addEventListener('click', openModalWindow);
refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
refs.lightbox.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
    
function openModalWindow(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'LI') return;
    refs.lightbox.classList.add('is-open');
    //refs.filmListGallery.forEach((item, index) =>
        //if()
        //currentInd = index;)
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