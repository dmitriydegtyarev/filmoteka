import debounce from 'lodash.debounce';
import './sass/main.scss';
import './js/api/axios';
import './js/api/moviedb';
import { refs } from './js/refs';
import onInputSearch from './js/input';

refs.inputEl.addEventListener('input', debounce(onInputSearch, 500));
