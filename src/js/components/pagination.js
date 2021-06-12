import paginationListTpl from '../../templates/pagination.hbs';
import defaultImage from '../data/noPoster';
import moviesTemplate from '../../templates/film-list.hbs';
import { renderMarkup } from '../api/renderMarkup';
import { renderPopularMovie } from '../api/renderMarkup';
import api from '../api/apiService';
import { refs } from '../refs';

const { paginationList, filmListGallery } = refs;

const paginationRefs = {
  firstItem: document.querySelector('.first-item'),
  paginationFirstItemSpan: document.querySelector('.pagination-first-item-span'),
  paginationLastItemSpan: document.querySelector('.pagination-last-item-span'),
};

let currentItem = paginationRefs.firstItem.classList.add('current-item');

export function renderPagination() {
  api
    .getPopularMovies()
    .then(response => response.data)
    .then(result => {
      renderMarkupPagination(result);
      paginationChange(result.page, result.total_pages);
      for (let child of paginationList.children) {
        onClickItem(child, result.total_pages);
      }
    })
    .catch(error => console.log(error));
}

const renderMarkupPagination = result => {
  const markup = paginationListTpl(result);
  paginationList.insertAdjacentHTML('beforeend', markup);
};

function onClickItem(child, allPages) {
  child.addEventListener('click', function () {
    removeClass();
    child.classList.add('current-item');
    const currentItem = document.querySelector('.current-item');
    const currentItemNum = +currentItem.textContent;
    api.page = currentItemNum;

    renderPopularMovie();

    if (currentItemNum > 4 && currentItemNum < allPages - 4) {
      removeClass();
      paginationList.children[1].classList.remove('visually-hidden');
      paginationList.children[2].textContent = currentItemNum - 2;
      paginationList.children[3].textContent = currentItemNum - 1;
      paginationList.children[4].textContent = currentItemNum;
      paginationList.children[5].textContent = currentItemNum + 1;
      paginationList.children[6].textContent = currentItemNum + 2;

      paginationList.children[4].classList.add('current-item');
    }

    if (currentItemNum >= allPages - 4 && currentItemNum <= allPages) {
      removeClass();
      paginationList.children[7].classList.add('visually-hidden');
      paginationList.children[2].textContent = allPages - 5;
      paginationList.children[3].textContent = allPages - 4;
      paginationList.children[4].textContent = allPages - 3;
      paginationList.children[5].textContent = allPages - 2;
      paginationList.children[6].textContent = allPages - 1;

      currentItem.classList.add('current-item');
    }
  });
}

function paginationChange(pageNum, allPages) {
  paginationList.children[1].classList.add('visually-hidden');
  paginationList.children[2].textContent = pageNum + 1;
  paginationList.children[3].textContent = pageNum + 2;
  paginationList.children[4].textContent = pageNum + 3;
  paginationList.children[5].textContent = pageNum + 4;
}

function removeClass() {
  for (let child of paginationList.children) {
    if (child.classList.contains('current-item')) {
      child.classList.remove('current-item');
    }
  }
}
