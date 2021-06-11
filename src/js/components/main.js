import { refs } from '../refs.js';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

reload();

refs.switchInputEl.addEventListener('change', onSelectTheme);

function onSelectTheme(evt) {
  evt.preventDefault();
  refs.bodyEl.classList.add(Theme.LIGHT);
  refs.bodyEl.classList.toggle(Theme.DARK);
  refs.modal.classList.add(Theme.LIGHT);
  refs.modal.classList.toggle(Theme.DARK);

  
  if (refs.bodyEl.classList.value === 'light-theme') {
    localStorage.setItem('theme', Theme.LIGHT);
  } else {
    localStorage.setItem('theme', Theme.DARK);
  }
}

 function reload() {
    const saveTheme = localStorage.getItem('theme');
   if (saveTheme) {
     console.log('saveTheme :>> ', saveTheme);
     if (saveTheme === 'dark-theme') {
       refs.switchInputEl.checked = true;
       refs.bodyEl.classList.add(Theme.DARK);
       refs.modal.classList.add(Theme.DARK);
       localStorage.setItem('theme', Theme.DARK);
     } else {
       refs.switchInputEl.checked = false;
       refs.bodyEl.classList.add(Theme.LIGHT);
       refs.modal.classList.add(Theme.LIGHT);
       localStorage.setItem('theme', Theme.LIGHT);
     }
    }
  };