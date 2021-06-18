const LogInBtnEl = document.querySelector('.LogIn-btn');
const registrationBtnEl = document.querySelector('.registration-btn');
const inputEl = document.querySelector('.form-field-input');

export default function LogInUser() {

    if (inputEl.value !== '')
    {
        LogInBtnEl.classList.remove('hidden');
        registrationBtnEl.classList.add('hidden');
    }
};





