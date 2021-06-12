import paginationListTpl from '../../templates/pagination.hbs';
import api from '../api/apiService';
import { refs } from '../refs';

const { paginationList } = refs;

export function renderPagination() {
  api
    .getPopularMovies()
    .then(response => response.data)
    .then(result => renderMarkupPagination(result))
    .catch(error => console.log(error));
}

const renderMarkupPagination = result => {
  const markup = paginationListTpl(result);
  paginationList.insertAdjacentHTML('afterbegin', markup);
};
