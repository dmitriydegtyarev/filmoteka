// import { refs } from '../refs.js';

// refs.btnUp.addEventListener('click', goUp);

// // Обработчик события прокрутки страницы
// // window.onscroll = function () {
// //   scrollFunction();
// // };

// // Функция вызываемая в момент прокрутки страницы
// function scrollFunction() {
//   btnUP = document.getElementById('btn-up');
// //   условия прокрутки скролла
//   if (document.body.scrollTop > 480 || document.documentElement.scrollTop > 480) {
//     btnUp.style.opacity = '0';
//   } else {
//     btnUp.style.opacity = '1';
//   }
// }
// // Когда юзер кликает по кнопке то возвращает его в самое начало страницы
// function topFunction(){
//     document.documentElement.scrollTop = 0;
// }

// window.onscroll = function () {
//   let scrollElement = document.getElementById('btn-up');
//   if (document.body.scrollTop > document.documentElement.clientHeight) {
//     scrollElement.style.opacity = '1';
//   } else {
//     scrollElement.style.opacity = '0';
//   }
// };
// let timeOut;
// function goUp() {
//   const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
//   if (top > 0) {
//     window.scrollBy(0, -100);
//     timeout = setTimeout('goUp()', 20);
//   } else clearTimeout(timeOut);
// }
