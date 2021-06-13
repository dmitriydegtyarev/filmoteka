import api from '../api/apiService';
import defaultImage from '../data/noPoster';

export default function changePath(result) {
  result.forEach(element => {
    if (element.poster_path === null) {
      element.poster_path = defaultImage.NOPOSTER;
    } else {
      element.poster_path = `${api.basePosterPath}${element.poster_path}`;
    }
  });
}
