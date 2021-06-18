const exitBtnEl = document.querySelector('.exit-btn');
const navigationLibraryEl = document.querySelector('.navigation_library');
const LogInBtnEl = document.querySelector('.LogIn-btn');
const registrationBtnEl = document.querySelector('.registration-btn');

const userInfo = localStorage.getItem('userInfo');
import { refs } from '../refs';

refs.exitBtnEl.addEventListener('click', OnExitBtnClick);

function ClearLocalStorage() {
  try {
    const serInfo = localStorage.getItem('userInfo');
    if (serInfo) {
      localStorage.removeItem('userInfo');
    } else {
      return;
    }
  } catch (err) {
    alert('Get state error: ', err);
  }
}

export function OnExitBtnClick() {
  window.location.reload();
  LogInBtnEl.classList.add('hidden');
  registrationBtnEl.classList.remove('hidden');
  navigationLibraryEl.classList.add('hidden');
  ClearLocalStorage();
}

export function showMyLibrary() {
  refs.navigationLibraryEl.classList.remove('hidden');
}
