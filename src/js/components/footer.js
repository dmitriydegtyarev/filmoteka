import { refs } from '../refs.js';
import tmplAboutUs from '../../templates/about-us.hbs';
import dataAboutUs from '../data/about-us.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.aboutUs.addEventListener('click', onClickAboutUs);
function onClickAboutUs(e){
    e.preventDefault();
    const instance = basicLightbox.create(tmplAboutUs(dataAboutUs));
    instance.show();
}