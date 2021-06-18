import { refs } from '../refs';
import * as basicLightbox from 'basiclightbox';
import * as FilmModal from './modal.js';
import 'basiclightbox/dist/basicLightbox.min.css';
import toastify from 'toastify-js';

export async function changeHomePage(result) {
  const trailers = result.trailers;
  if (trailers.length == 0) {
    console.log('Нет трейлера');
    return null;
  }
  console.log('Есть ключ для трейлера');
  result.homepage = `https://www.youtube.com/embed/${trailers[trailers.length-1].key}`;
}

class TrailerModal{
  constructor(){
    this.instance = null;
  }
  showTrailer(url) {
    if(url === 'target="_blank"'){
      toastify({
        text: 'No trailers',
        duration: 2500,
        className: 'toastify-center_error',
      }).showToast();
     return;
    }
    console.log(url);
    const innerHtml = `<div class="trailer">
    <button class="trailer-player-close"></button>
    <iframe id="ytplayer" class="trailer-player" src="${url}" allowfullscreen frameborder="0"></iframe>
    </div>`;
    this.instance = basicLightbox.create(innerHtml, {
      onShow: instance => {
        FilmModal.Hide();
        this.instance.element().querySelector('.trailer-player-close').onclick = instance.close;
        window.addEventListener('keydown', this.onEscapeKeydown.bind(this));
      },
      onClose: () => {
        window.removeEventListener('keydown', this.onEscapeKeydown.bind(this));
        FilmModal.Restore();
        this.instance = null;
      },
    });
    this.instance.show();
  }
  onEscapeKeydown(e){
    if(e.key === "Escape")
    {
      e.preventDefault();
      this.instance.close();
    }
  }
}

export const trailerModal = new TrailerModal();