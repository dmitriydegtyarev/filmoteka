import { refs } from '../refs';

const regBtnText = document.querySelector('.registration-btn_text');

refs.exitBtnEl.addEventListener('click', OnExitBtnClick);

export function OnExitBtnClick() {
  window.location.reload();
}

export function showMyLibrary() {
  refs.navigationLibraryEl.classList.remove('hidden');
}
