import { refs } from '../refs';
import * as basicLightbox from 'basiclightbox';
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

export function showTrailer(url) {
  if(url === 'target="_blank"'){
    toastify({
      text: 'No trailers',
      duration: 2500,
      className: 'toastify-center_error',
    }).showToast();
   return;
  }
  console.log(url);
  const innerHtml = `<iframe id="ytplayer" src="${url}" allowfullscreen width="60%" height="60%" frameborder="0"></iframe>`;
  const instance = basicLightbox.create(innerHtml, {
    onShow: instance => {
      refs.lightbox.classList.remove('is-open');
    },
    onClose: () => {
      refs.lightbox.classList.add('is-open');
    },
  });
  instance.show();
}
