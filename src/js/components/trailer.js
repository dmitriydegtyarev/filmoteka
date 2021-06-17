import { refs } from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotify from '@pnotify/core';

PNotify.defaults.styling = 'brighttheme';
PNotify.defaults.icons = 'brighttheme';
PNotify.defaults.maxTextHeight = null;


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
    PNotify.error({
      text: 'No trailers',
      width: '360px',
      delay: 1000,
    });
   return;
  }
  console.log(url);
  const innerHtml = `<iframe id="ytplayer" src="${url}" allowfullscreen width="640" height="360" frameborder="0"></iframe>`;
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
