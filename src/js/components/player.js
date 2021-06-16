import { refs } from '../refs.js';
import api from '../api/apiService';


refs.linkTrailer.addEventListener('click', onLinkClick);

function onLinkClick(e) {
/* <a class="link film-trailer" href={{homepage}}>Watch the trailer</a> */
    showTrailer(e.target.href);
}