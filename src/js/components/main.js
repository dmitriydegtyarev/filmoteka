const bodyEl = document.querySelector('body');
const inputEl = document.querySelector('.theme-switch__toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

reload();

inputEl.addEventListener('change', onSelectTheme);

function onSelectTheme(evt) {
  evt.preventDefault();
  bodyEl.classList.add(Theme.LIGHT);
  bodyEl.classList.toggle(Theme.DARK);
  
  if (bodyEl.classList.value === 'light-theme') {
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
       inputEl.checked = true;
       bodyEl.classList.add(Theme.DARK);
       localStorage.setItem('theme', Theme.DARK);
     } else {
       inputEl.checked = false;
       bodyEl.classList.add(Theme.LIGHT);
       localStorage.setItem('theme', Theme.LIGHT);
     }
    }
  };