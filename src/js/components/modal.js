import { refs } from '../refs.js'

refs.filmListGallery.addEventListener('click', openModalWindow);

function openModalWindow(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'LI') return;
    refs.lightbox.classList.add('is-open');
    //refs.filmListGallery.forEach((item, index) =>
        //if()
        //currentInd = index;)
}