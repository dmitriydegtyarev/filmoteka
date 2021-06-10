const navigationHomeEl = document.querySelector('.navigation_home');
const navigationLibraryEl = document.querySelector('.navigation_library');

navigationHomeEl.addEventListener('click', onNavLinkHomeClick);
navigationLibraryEl.addEventListener('click', onNavLinkLibraryClick);

window.onload = function () {
  navigationHomeEl.classList.add('accent-home');
};

function onNavLinkHomeClick() {
  navigationHomeEl.classList.add('accent-home');
  navigationLibraryEl.classList.remove('accent-library');
}

function onNavLinkLibraryClick() {
  navigationHomeEl.classList.remove('accent-home');
  navigationLibraryEl.classList.add('accent-library');
}
