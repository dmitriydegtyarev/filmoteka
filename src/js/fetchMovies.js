import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import render from './render';
import api from './api/axios';

// export default function fetchMovies(query) {
//   if (query !== '') {
//     api
//       .getMovieOnSearchQuery()
//       .then(res => {
//         if (res.data.results.length === 0) {
//   const myAlert = error({
//     text: 'Search result not successful. Enter the correct movie name and try again...',
//     closer: true,
//     width: '500px',
//     delay: 3000,
//   });
//         render.errorMessage();
//       } else {
//         render.clearErrorMessage();
//       }

//       render.searchMovies(res.data.results);
//     })
//     .catch(error => console.log(error));
// }
// else {
//   api
//     .getPopularMovies()
//     .then(res => {
//       render.searchMovies(res.data.results);
//     })
//     .catch(error => console.log(error));
// }
// }
