import debounce from 'lodash.debounce';

import api from '../api/apiService';
import { renderMoviesBySearchQuery, renderPopularMovie } from '../api/renderMarkup';
import { renderPaginationOnSearchQuery } from '../components/paginationOnSearchQuery';
import { renderPagination } from '../components/pagination';

import { refs } from '../refs';

const { inputEl } = refs;

function onInputSearch(e) {
  api.query = e.target.value;
  api.resetPage();
  if (e.target.value === '') {
    renderPopularMovie();
  } else {
    renderMoviesBySearchQuery(api.query);
    renderPaginationOnSearchQuery();
  }
}

export function clearInput() {
  inputEl.value = '';
}

inputEl.addEventListener('input', debounce(onInputSearch, 1000));
