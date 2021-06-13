import toastify from 'toastify-js';

export default function showMessage(response) {
  if (response.data.results.length === 0) {
    toastify({
      text: 'Search result not successful. Enter the correct movie name and try again...',
      duration: 2500,
      className: 'toastify-center_error',
    }).showToast();
  } else {
    toastify({
      text: `search successful: ${response.data.total_results} founded`,
      duration: 2500,
      className: 'toastify-center_successful',
    }).showToast();
  }
}
