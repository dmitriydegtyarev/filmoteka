const navigationHomeEl = document.querySelector('.navigation_home');
const navigationLibraryEl = document.querySelector('.navigation_library');
const myLibraryBtnsEl = document.querySelector('.my-library_btns');
const inputDivEl = document.querySelector('.input-div');
const headerEl = document.querySelector('.header');

navigationHomeEl.addEventListener('click', onNavLinkHomeClick);
navigationLibraryEl.addEventListener('click', onNavLinkLibraryClick);


window.onload = function () {
  navigationHomeEl.classList.add('accent-home');
};

function onNavLinkHomeClick() {
  navigationHomeEl.classList.add('accent-home');
  navigationLibraryEl.classList.remove('accent-library');
  inputDivEl.classList.remove('hidden');
  myLibraryBtnsEl.classList.add('hidden');
  // changeHomeImg();
}

function onNavLinkLibraryClick() {
  navigationHomeEl.classList.remove('accent-home');
  navigationLibraryEl.classList.add('accent-library');
  inputDivEl.classList.add('hidden');
  myLibraryBtnsEl.classList.remove('hidden');
  // changeLbImg();
}
// Це ще не працює

// function changeLbImg() {
//   headerEl.style.backgroundImage = "url('/images/mylibraryfoto.jpg')";
// };

// function changeHomeImg() {
//   headerEl.style.backgroundImage = 'url( "/ images / mylibraryfoto.jpg" )';

// };

// console.log(headerEl.style.backgroundImage);