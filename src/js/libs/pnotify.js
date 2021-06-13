import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { error, success } from '@pnotify/core';

export default function showMessage(response) {
  if (response.data.results.length === 0) {
    error({
      text: 'Search result not successful. Enter the correct movie name and try again...',
      type: 'error',
      delay: 2000,
    });
  } else {
    success({
      text: `search successful:
             ${response.data.total_results} founded`,
      delay: 2000,
    });
  }
}
