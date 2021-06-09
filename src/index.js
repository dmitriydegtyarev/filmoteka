import debounce from 'lodash.debounce';
import './sass/main.scss';
import './js/api/axios';
import './js/api/moviedb';
import { refs } from './js/refs';
import onInputSearch from './js/input';
import api from './js/api/axios';
import moviesTpl from './templates/film-list.hbs';

refs.inputEl.addEventListener('input', debounce(onInputSearch, 500));
