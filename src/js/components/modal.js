import { refs } from '../refs.js';
import api from '../api/apiService';
import filmCardTmp from '../../templates/film-card.hbs';
//import  getFilmInModal from '../api/renderMarkup';
import firebaseApi from '../components/firebase';

refs.filmListGallery.addEventListener('click', openModalWindow);

function openModalWindow(e) {
  refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
  refs.lightbox.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress);
  //добавить в просмотренные или в список просмотра

  // refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick);

  refs.lightbox.classList.add('is-open');

  if (e.target.nodeName !== 'IMG') return;
  //getFilmInModal(e);
  api.id = e.target.id;
  console.log('api.id :>> ', api.id);
  api
    .getMovieById()
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .then(
      ({
        id,
        poster_path,
        original_title,
        name,
        vote_average,
        vote_count,
        popularity,
        overview,
        genres,
        homepage,
      }) => {
        const allGenres = genres.map(genre => genre.name).join();
        console.log(api.ganres);
        //console.log('object :>> ', genres.map(genre=>genre.name).join());
        return {
          id,
          poster_path,
          original_title,
          name,
          vote_average,
          vote_count,
          popularity,
          overview,
          allGenres,
          homepage,
        };
      },
    )
    .then(renderFilmMarkup)
    .then(() => {
      const addWatchedBtnEl = document.querySelector('.add-watched_button');
      addWatchedBtnEl.addEventListener('click', onAddWatchedBtnClick);
      function onAddWatchedBtnClick(id) {
        api.getMovieById(id).then(({ data }) => {
          firebaseApi.postWatchedData({ data });
        });

        addWatchedBtnEl.classList.add('press-btn');
        addWatchedBtnEl.textContent = 'Added to Watched';
        addWatchedBtnEl.disabled = true;
      }
      const addQueueBtnEl = document.querySelector('.add-queue_button');
      addQueueBtnEl.addEventListener('click', onAddQueueBtnClick);
      function onAddQueueBtnClick(id) {
        api.getMovieById(id).then(({ data }) => {
          firebaseApi.postQueueData({ data });
        });

        addWatchedBtnEl.classList.add('press-btn');
        addWatchedBtnEl.textContent = 'Added to Queue';
        addWatchedBtnEl.disabled = true;
      }
    });
}

function renderFilmMarkup(film) {
  console.log('refs.filmCard :>> ', refs.filmCard);
  refs.filmCard.insertAdjacentHTML('beforeend', filmCardTmp(film));
}

function onModalWindowCloseBtn() {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscPress);
  refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
}

function onOverlayClick(e) {
  console.log('e.target :>> ', e.target);
  console.log('e.currentTarget :>> ', e.currentTarget);
  if (e.target === e.currentTarget) {
    onModalWindowCloseBtn();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onModalWindowCloseBtn();
  }
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
