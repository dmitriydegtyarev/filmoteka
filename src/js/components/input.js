import debounce from 'lodash.debounce';

import api from '../api/apiService';
import { renderMovisBySearchQuery } from '../api/renderMarkup';
import { refs } from '../refs';

const { inputEl } = refs;

function onInputSearch(e) {
  api.query = e.target.value;
  renderMovisBySearchQuery(api.query);
}

inputEl.addEventListener('input', debounce(onInputSearch, 500));

// import imgNoPoster from '../../images/no-poster/noposter.jpg';
// console.log(imgNoPoster);

// export default {
//   NOPOSTER: imgNoPoster,
// };
