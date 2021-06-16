import api from '../api/apiService';
import defaultImage from '../data/noPoster';

export function changePath(result) {
  result.forEach(element => {
    if (element.poster_path === null) {
      element.poster_path = defaultImage.NOPOSTER;
    } else {
      element.poster_path = `${api.basePosterPath}${element.poster_path}`;
    }
  });
}

export function changeFilmPath(film) {
  if (film.poster_path === null) {
    film.poster_path = defaultImage.NOPOSTER;
  } else {
    film.poster_path = `${api.basePosterPath}${film.poster_path}`;
  }
}
