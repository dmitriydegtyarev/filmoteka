import toastify from 'toastify-js';

export function erroMessageRegister() {
  toastify({
    text: `Sorry, you are already registered or email not valid!`,
    duration: 2500,
    className: 'toastify-center_error',
  }).showToast();
}

export function erroMessageLogin() {
  toastify({
    text: `Sorry, email/password are not valid or you have not registred!`,
    duration: 2500,
    className: 'toastify-center_error',
  }).showToast();
}