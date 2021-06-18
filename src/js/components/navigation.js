import api from '../api/apiService';
import { paginationChange, renderPaginationMobile } from '../components/pagination';
import { renderPopularMovie, clearMarkup } from '../api/renderMarkup';
import { clearInput } from '../components/input';
import onMyWatchedBtn from './mylibrary';

const navigationHomeEl = document.querySelector('.navigation_home');
const navigationLibraryEl = document.querySelector('.navigation_library');
const myLibraryBtnsEl = document.querySelector('.my-library_btns');
const inputDivEl = document.querySelector('.input-div');
const headerEl = document.querySelector('.header');
const libraryWatchedEl = document.querySelector('.my-library_btn-watched');
const libraryQueueEl = document.querySelector('.my-library_btn-queue');
const logoFilmEl = document.querySelector('.logo-search_film');
const registrationBtnEl = document.querySelector('.registration-btn');
const exitBtnEl = document.querySelector('.exit-btn');
const LogInBtnEl = document.querySelector('.LogIn-btn');

navigationHomeEl.addEventListener('click', onNavLinkHomeClick);
navigationLibraryEl.addEventListener('click', onNavLinkLibraryClick);
logoFilmEl.addEventListener('click', onNavLinkHomeClick);

libraryWatchedEl.addEventListener('click', currentLinkWatched);
libraryQueueEl.addEventListener('click', currentLinkQueue);

window.onload = function () {
  navigationHomeEl.classList.add('accent-home');
};

function onNavLinkHomeClick(e) {
  navigationHomeEl.classList.add('accent-home');
  navigationLibraryEl.classList.remove('accent-library');
  inputDivEl.classList.remove('hidden');
  myLibraryBtnsEl.classList.add('hidden');
  exitBtnEl.classList.remove('hidden');
  changeHomeImg();

  api.resetPage();
  clearInput();
  clearMarkup();
  renderPopularMovie();
  paginationChange(api.page);
  renderPaginationMobile(api.page);
}

function onNavLinkLibraryClick() {
  onMyWatchedBtn();
  navigationHomeEl.classList.remove('accent-home');
  navigationLibraryEl.classList.add('accent-library');
  inputDivEl.classList.add('hidden');
  myLibraryBtnsEl.classList.remove('hidden');
  registrationBtnEl.classList.add('hidden');
  exitBtnEl.classList.add('hidden');
  LogInBtnEl.classList.add('hidden');
  changeLbImg();
}

function changeLbImg() {
  headerEl.classList.remove('header');
  headerEl.classList.add('header__library');
}

function changeHomeImg() {
  headerEl.classList.remove('header__library');
  headerEl.classList.add('header');
}

function currentLinkWatched() {
  libraryWatchedEl.classList.add('current-link');
  libraryQueueEl.classList.remove('current-link');
}

function currentLinkQueue() {
  libraryWatchedEl.classList.remove('current-link');
  libraryQueueEl.classList.add('current-link');
}
