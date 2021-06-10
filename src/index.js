import debounce from 'lodash.debounce';

import './sass/main.scss';

import './js/api/axios';
import './js/api/moviedb';
import './js/components/navigation';
import './js/components/modal';
import './js/components/footer';

import { refs } from './js/refs';
import onInputSearch from './js/input';
import api from './js/api/axios';

refs.inputEl.addEventListener('input', debounce(onInputSearch, 500));
