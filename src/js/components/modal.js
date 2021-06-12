import { refs } from '../refs.js';
import api from '../api/apiService';
import filmCardTmp from '../../templates/film-card.hbs';
//import  getFilmInModal from '../api/renderMarkup';

refs.filmListGallery.addEventListener('click', openModalWindow);

function openModalWindow(e) {
  refs.modalCloseBtn.addEventListener('click', onModalWindowCloseBtn);
  refs.lightbox.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress);
   
  refs.lightbox.classList.add('is-open');
  
  resetModal();

  if (e.target.nodeName !== 'IMG') return;
  //getFilmInModal(e);
  api.id = e.target.id;
  //console.log('api.id :>> ', api.id);
  api
    .getMovieById()
    .then(response => {
      //console.log(response.data);
      return response.data;
     }).then(getGenres)
      .then(renderFilmMarkup)
      .catch(error => console.log(error));
}

 //добавить в просмотренные или в список просмотра
  refs.addWatchedBtn.addEventListener('click', onAddWatchedBtnClick);
  refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick);

function renderFilmMarkup(film) {
  refs.filmCard.insertAdjacentHTML('beforeend', filmCardTmp(film));
}

export default function getGenres(data) {
  const { id, poster_path, original_title, name,first_air_date,release_date, vote_average, vote_count, popularity, overview, genres, homepage } = data;
  const allGenres = genres.map(genre=>genre.name).join();
  //console.log('object :>> ', genres.map(genre => genre.name).join());
  //console.log({ id, poster_path, original_title, name, vote_average, vote_count, popularity, overview, allGenres, homepage });
  return ({id,poster_path,original_title, name, first_air_date, release_date, vote_average,vote_count,popularity, overview, allGenres, homepage});
}

function getFullYearFilm(year) {
  const date = new Date(year);
  const fullYear = date.getFullYear(date);
  console.log('fullYear :>> ', fullYear);
  return fullYear;
}

function onAddWatchedBtnClick(id) {
  // дописать логику

  refs.addWatchedBtn.classList.add('press-btn');
  refs.addWatchedBtn.textContent = 'Added to Watched';
  refs.addWatchedBtn.disabled = true;
}

function onAddQueueBtnClick(id) {
  // дописать логику
  refs.addQueueBtn.classList.add('press-btn');
  refs.addQueueBtn.textContent = 'Added to Queue';
  refs.addQueueBtn.disabled = true;
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

function resetModal() {
  refs.filmCard.innerHTML = '';
}

refs.modalCloseBtn.removeEventListener('click', onModalWindowCloseBtn);
