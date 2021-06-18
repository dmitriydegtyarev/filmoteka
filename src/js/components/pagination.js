import paginationListTpl from '../../templates/pagination.hbs';
import defaultImage from '../data/noPoster';
import moviesTemplate from '../../templates/film-list.hbs';
import { renderMarkup } from '../api/renderMarkup';
import { renderPopularMovie } from '../api/renderMarkup';
import api from '../api/apiService';
import { refs } from '../refs';
import debounce from 'lodash.debounce';

const { paginationList, paginationListMobile, filmListGallery } = refs;

const paginationRefs = {
  pagination: document.querySelector('.pagination'),
  paginationMobile: document.querySelector('.pagination-mobile'),
  firstItem: document.querySelector('.first-item'),
  paginationMobileItem: document.querySelector('.pagination-mobile-item'),
  paginationFirstItemSpan: document.querySelector('.pagination-first-item-span'),
  paginationLastItemSpan: document.querySelector('.pagination-last-item-span'),
  buttonPrev: document.querySelector('.button-prev'),
  buttonMobilePrev: document.querySelector('.button-mobile-prev'),
  buttonNext: document.querySelector('.button-next'),
  buttonMobileNext: document.querySelector('.button-mobile-next'),
};

export function renderPagination() {
  api
    .getPopularMovies()
    .then(response => response.data)
    .then(result => {
      renderMarkupPagination(result);

      paginationRefs.pagination.classList.remove('visually-hidden');
      paginationRefs.paginationMobile.classList.add('visually-hidden');
      paginationChange(result.page);
      for (let child of paginationList.children) {
        onClickItem(child, result.total_pages);
      }
      onClickPrev(result.total_pages);
      onClickNext(result.total_pages);

      window.addEventListener(
        'resize',
        debounce(function () {
          const wiewportWigth = Math.max(
            this.document.documentElement.clientWidth,
            this.innerWidth || 0,
          );
          if (wiewportWigth < 767) {
            paginationRefs.pagination.classList.add('visually-hidden');
            paginationRefs.paginationMobile.classList.remove('visually-hidden');
            renderPaginationMobile(result.page);
            for (let child of paginationListMobile.children) {
              onClickItemMobile(child, result.total_pages);
            }
            onClickPrevMobile(result.total_pages);
            onClickNextMobile(result.total_pages);
          } else {
            paginationRefs.pagination.classList.remove('visually-hidden');
            paginationRefs.paginationMobile.classList.add('visually-hidden');
          }
        }, 500),
      );
    })
    .catch(error => console.log(error));
}

const renderMarkupPagination = result => {
  const markup = paginationListTpl(result);
  paginationList.insertAdjacentHTML('beforeend', markup);
  paginationListMobile.insertAdjacentHTML('beforeend', markup);
};

export function renderPaginationMobile(pageNum) {
  // api.page = pageNum;
  removeClassMobile();
  renderPopularMovie();
  paginationRefs.paginationMobileItem.classList.add('visually-hidden');
  paginationListMobile.children[1].classList.add('visually-hidden');
  paginationListMobile.children[7].classList.add('visually-hidden');
  paginationListMobile.children[8].classList.add('visually-hidden');
  paginationListMobile.children[2].classList.add('current-item');
  paginationListMobile.children[2].textContent = pageNum;
  paginationListMobile.children[3].textContent = pageNum + 1;
  paginationListMobile.children[4].textContent = pageNum + 2;
  paginationListMobile.children[5].textContent = pageNum + 3;
  paginationListMobile.children[6].textContent = pageNum + 4;
}

function onClickPrevMobile(allPages) {
  paginationRefs.buttonMobilePrev.addEventListener('click', function () {
    api.page -= 1;
    renderPopularMovie();
    for (let child of paginationListMobile.children) {
      if (child.classList.contains('current-item')) {
        removeClassMobile();
        if (api.page === 1) {
          paginationRefs.buttonMobilePrev.classList.add('visually-hidden');
          paginationListMobile.children[2].classList.add('current-item');
        }
        if (api.page >= 2 && api.page <= 3) {
          paginationRefs.buttonMobilePrev.classList.remove('visually-hidden');
          child.previousElementSibling.classList.add('current-item');
          paginationListMobile.children[2].textContent = 1;
          paginationListMobile.children[3].textContent = 2;
          paginationListMobile.children[4].textContent = 3;
          paginationListMobile.children[5].textContent = 4;
          paginationListMobile.children[6].textContent = 5;
          if (api.page === 3) {
            removeClassMobile();
            paginationListMobile.children[4].classList.add('current-item');
          }
          if (api.page === 2) {
            removeClassMobile();
            paginationListMobile.children[3].classList.add('current-item');
          }
        }
      }
      if (api.page >= 4 && api.page <= allPages) {
        removeClassMobile();
        paginationListMobile.children[4].classList.add('current-item');
        paginationListMobile.children[2].textContent = api.page - 2;
        paginationListMobile.children[3].textContent = api.page - 1;
        paginationListMobile.children[4].textContent = api.page;
        paginationListMobile.children[5].textContent = api.page + 1;
        paginationListMobile.children[6].textContent = api.page + 2;
      }
    }
  });
}

function onClickItemMobile(child, allPages) {
  child.addEventListener('click', function () {
    // console.log(api.page);
    removeClassMobile();
    child.classList.add('current-item');
    // console.log(child.textContent);
    const currentItemNum = +child.textContent;
    api.page = currentItemNum;
    // console.log(currentItemNum);
    renderPopularMovie();
    paginationRefs.buttonMobilePrev.classList.remove('visually-hidden');
    if (currentItemNum < 4) {
      removeClassMobile();
      child.classList.add('current-item');
      paginationListMobile.children[2].textContent = 1;
      paginationListMobile.children[3].textContent = 2;
      paginationListMobile.children[4].textContent = 3;
      paginationListMobile.children[5].textContent = 4;
      paginationListMobile.children[6].textContent = 5;
      if (currentItemNum === 3) {
        removeClassMobile();
        paginationListMobile.children[4].classList.add('current-item');
      }
      if (currentItemNum === 2) {
        removeClassMobile();
        paginationListMobile.children[3].classList.add('current-item');
      }
    }
    if (currentItemNum >= 4 && currentItemNum <= allPages) {
      removeClassMobile();
      paginationListMobile.children[4].classList.add('current-item');
      paginationListMobile.children[2].textContent = currentItemNum - 2;
      paginationListMobile.children[3].textContent = currentItemNum - 1;
      paginationListMobile.children[4].textContent = currentItemNum;
      paginationListMobile.children[5].textContent = currentItemNum + 1;
      paginationListMobile.children[6].textContent = currentItemNum + 2;
    }
  });
}

function onClickNextMobile(allPages) {
  paginationRefs.buttonMobileNext.addEventListener('click', function () {
    api.page += 1;
    renderPopularMovie();
    for (let child of paginationListMobile.children) {
      if (child.classList.contains('current-item')) {
        removeClassMobile();
        if (api.page === 1) {
          paginationRefs.buttonMobilePrev.classList.add('visually-hidden');
          paginationListMobile.children[2].classList.add('current-item');
        }
        if (api.page >= 2 && api.page <= 3) {
          paginationRefs.buttonMobilePrev.classList.remove('visually-hidden');
          child.previousElementSibling.classList.add('current-item');
          paginationListMobile.children[2].textContent = 1;
          paginationListMobile.children[3].textContent = 2;
          paginationListMobile.children[4].textContent = 3;
          paginationListMobile.children[5].textContent = 4;
          paginationListMobile.children[6].textContent = 5;
          if (api.page === 3) {
            removeClassMobile();
            paginationListMobile.children[4].classList.add('current-item');
          }
          if (api.page === 2) {
            removeClassMobile();
            paginationListMobile.children[3].classList.add('current-item');
          }
        }
      }
      if (api.page >= 4 && api.page <= allPages) {
        removeClassMobile();
        paginationListMobile.children[4].classList.add('current-item');
        paginationListMobile.children[2].textContent = api.page - 2;
        paginationListMobile.children[3].textContent = api.page - 1;
        paginationListMobile.children[4].textContent = api.page;
        paginationListMobile.children[5].textContent = api.page + 1;
        paginationListMobile.children[6].textContent = api.page + 2;
      }
    }
  });
}

function onClickPrev(allPages) {
  paginationRefs.buttonPrev.addEventListener('click', function () {
    api.page -= 1;
    renderPopularMovie();
    for (let child of paginationList.children) {
      if (child.classList.contains('current-item')) {
        removeClass();
        if (api.page === 1) {
          paginationRefs.buttonPrev.classList.add('visually-hidden');
          paginationRefs.firstItem.classList.add('current-item');
          paginationRefs.buttonNext.classList.remove('visually-hidden');
        }
        if (api.page >= 2 && api.page <= 3) {
          paginationRefs.buttonPrev.classList.remove('visually-hidden');
          paginationRefs.buttonNext.classList.remove('visually-hidden');
          removeClass();
          child.previousElementSibling.classList.add('current-item');
        }
        if (api.page === 4) {
          paginationRefs.buttonPrev.classList.remove('visually-hidden');
          paginationList.children[4].classList.add('current-item');
          paginationList.children[1].classList.add('visually-hidden');
          paginationRefs.buttonNext.classList.remove('visually-hidden');
          paginationList.children[2].textContent = 2;
          paginationList.children[3].textContent = 3;
          paginationList.children[4].textContent = 4;
          paginationList.children[5].textContent = 5;
          paginationList.children[6].textContent = 6;
        }
      }
    }
    if (api.page > 4 && api.page < allPages - 4) {
      paginationRefs.buttonNext.classList.remove('visually-hidden');
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      removeClass();
      paginationList.children[4].classList.add('current-item');
      paginationList.children[2].textContent = api.page - 2;
      paginationList.children[3].textContent = api.page - 1;
      paginationList.children[4].textContent = api.page;
      paginationList.children[5].textContent = api.page + 1;
      paginationList.children[6].textContent = api.page + 2;
      paginationList.children[7].classList.remove('visually-hidden');
    }
    if (api.page >= allPages - 4 && api.page <= allPages) {
      paginationRefs.buttonNext.classList.remove('visually-hidden');
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      paginationList.children[2].textContent = allPages - 5;
      paginationList.children[3].textContent = allPages - 4;
      paginationList.children[4].textContent = allPages - 3;
      paginationList.children[5].textContent = allPages - 2;
      paginationList.children[6].textContent = allPages - 1;

      for (let child of paginationList.children) {
        if (+child.textContent === api.page) {
          removeClass();
          child.classList.add('current-item');
        }
      }
    }
  });
}

function onClickItem(child, allPages) {
  child.addEventListener('click', function () {
    removeClass();
    child.classList.add('current-item');
    const currentItem = document.querySelector('.current-item');
    const currentItemNum = +currentItem.textContent;
    api.page = currentItemNum;

    if (currentItemNum === allPages) {
      paginationRefs.buttonNext.classList.add('visually-hidden');
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
    }

    if (currentItemNum > 1 && currentItemNum < allPages) {
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      paginationRefs.buttonNext.classList.remove('visually-hidden');
    }

    if (currentItemNum === 1) {
      paginationRefs.buttonPrev.classList.add('visually-hidden');
      paginationRefs.buttonNext.classList.remove('visually-hidden');
    }

    renderPopularMovie();

    if (currentItemNum <= 4) {
      paginationList.children[1].classList.add('visually-hidden');
      paginationList.children[2].textContent = 2;
      paginationList.children[3].textContent = 3;
      paginationList.children[4].textContent = 4;
      paginationList.children[5].textContent = 5;
      paginationList.children[6].textContent = 6;
      paginationList.children[7].classList.remove('visually-hidden');

      if (currentItemNum === 3) {
        removeClass();
        paginationList.children[3].classList.add('current-item');
      }

      if (currentItemNum === 4) {
        removeClass();
        paginationList.children[4].classList.add('current-item');
      }
    }
    if (currentItemNum > 4 && currentItemNum < allPages - 4) {
      removeClass();
      paginationList.children[1].classList.remove('visually-hidden');
      paginationList.children[2].textContent = currentItemNum - 2;
      paginationList.children[3].textContent = currentItemNum - 1;
      paginationList.children[4].textContent = currentItemNum;
      paginationList.children[5].textContent = currentItemNum + 1;
      paginationList.children[6].textContent = currentItemNum + 2;
      paginationList.children[7].classList.remove('visually-hidden');

      paginationList.children[4].classList.add('current-item');
    }

    if (currentItemNum >= allPages - 4 && currentItemNum <= allPages) {
      removeClass();
      paginationList.children[1].classList.remove('visually-hidden');
      paginationList.children[2].textContent = allPages - 5;
      paginationList.children[3].textContent = allPages - 4;
      paginationList.children[4].textContent = allPages - 3;
      paginationList.children[5].textContent = allPages - 2;
      paginationList.children[6].textContent = allPages - 1;
      paginationList.children[7].classList.add('visually-hidden');

      currentItem.classList.add('current-item');
    }
  });
}

function onClickNext(allPages) {
  paginationRefs.buttonNext.addEventListener('click', function () {
    api.page += 1;
    renderPopularMovie();
    if (api.page === allPages) {
      paginationRefs.buttonNext.classList.add('visually-hidden');
    }
    if (api.page <= 4) {
      paginationRefs.buttonNext.classList.remove('visually-hidden');
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      paginationList.children[1].classList.add('visually-hidden');
      paginationList.children[2].textContent = 2;
      paginationList.children[3].textContent = 3;
      paginationList.children[4].textContent = 4;
      paginationList.children[5].textContent = 5;
      paginationList.children[6].textContent = 6;
      for (let child of paginationList.children) {
        if (+child.textContent === api.page) {
          removeClass();
          child.classList.add('current-item');
        }
      }
    }
    if (api.page > 4 && api.page < allPages - 4) {
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      paginationRefs.buttonNext.classList.remove('visually-hidden');
      removeClass();
      paginationList.children[4].classList.add('current-item');
      paginationList.children[2].textContent = api.page - 2;
      paginationList.children[3].textContent = api.page - 1;
      paginationList.children[4].textContent = api.page;
      paginationList.children[5].textContent = api.page + 1;
      paginationList.children[6].textContent = api.page + 2;
      paginationList.children[1].classList.remove('visually-hidden');
    }
    if (api.page >= allPages - 4 && api.page <= allPages) {
      paginationRefs.buttonPrev.classList.remove('visually-hidden');
      paginationList.children[2].textContent = allPages - 5;
      paginationList.children[3].textContent = allPages - 4;
      paginationList.children[4].textContent = allPages - 3;
      paginationList.children[5].textContent = allPages - 2;
      paginationList.children[6].textContent = allPages - 1;
      paginationList.children[7].classList.add('visually-hidden');

      for (let child of paginationList.children) {
        if (+child.textContent === api.page) {
          removeClass();
          child.classList.add('current-item');
        }
      }
    }
  });
}

export function paginationChange(pageNum) {
  removeClass();
  paginationList.children[7].classList.remove('visually-hidden');
  paginationRefs.buttonNext.classList.remove('visually-hidden');
  paginationList.children[1].classList.add('visually-hidden');
  paginationList.children[2].textContent = pageNum + 1;
  paginationList.children[3].textContent = pageNum + 2;
  paginationList.children[4].textContent = pageNum + 3;
  paginationList.children[5].textContent = pageNum + 4;
  paginationList.children[6].textContent = pageNum + 5;
  paginationRefs.firstItem.classList.add('current-item');
}

function removeClass() {
  for (let child of paginationList.children) {
    if (child.classList.contains('current-item')) {
      child.classList.remove('current-item');
    }
  }
}

function removeClassMobile() {
  for (let child of paginationListMobile.children) {
    if (child.classList.contains('current-item')) {
      child.classList.remove('current-item');
    }
  }
}
