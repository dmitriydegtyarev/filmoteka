import { refs } from '../refs';
import { getFilmInRecentlyViewed } from '../api/renderMarkup';

refs.filmListGallery.addEventListener('click', addToRecentlyVieved);

function addToRecentlyVieved(e) {
    if (e.target.nodeName !== 'IMG') return;

    getFilmInRecentlyViewed(e);    
}