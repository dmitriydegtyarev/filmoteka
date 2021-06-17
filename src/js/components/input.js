import debounce from 'lodash.debounce';

import api from '../api/apiService';
import { renderMoviesBySearchQuery } from '../api/renderMarkup';
import { renderPagination } from '../components/pagination';
import { refs } from '../refs';

const { inputEl } = refs;

function onInputSearch(e) {
  api.query = e.target.value;
  api.resetPage();
  renderMoviesBySearchQuery(api.query);
  renderPagination(api.query);
}

export function clearInput() {
  inputEl.value = '';
}

inputEl.addEventListener('input', debounce(onInputSearch, 1000));
