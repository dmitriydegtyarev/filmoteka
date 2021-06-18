import toastify from 'toastify-js';

export default function erroMessageRegister() {
  toastify({
    text: `Sorry, you are already registered or email not valid!`,
    duration: 2500,
    className: 'toastify-center_error',
  }).showToast();
}
