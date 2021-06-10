import debounce from 'lodash.debounce';

import api from './api/axios';
import { renderMovisBySearchQuery } from './api/moviedb';
import { refs } from './refs';

function onInputSearch(e) {
  api.query = e.target.value;
  renderMovisBySearchQuery(api.query);
}

refs.inputEl.addEventListener('input', debounce(onInputSearch, 500));
