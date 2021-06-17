import { refs } from '../refs';

const regBtnText = document.querySelector('.registration-btn_text');
const exitBtnEl = document.querySelector('.exit-btn');

exitBtnEl.addEventListener('click', OnExitBtnClick);

export function OnExitBtnClick() {
  window.location.reload();
}

export function showMyLibrary() {
  refs.navigationLibraryEl.classList.remove('hidden');
}
