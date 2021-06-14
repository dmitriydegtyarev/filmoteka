import { refs } from '../refs.js';
refs.btnUp.addEventListener('click', onBtnUpClick);
function onBtnUpClick() {
  document.body.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
