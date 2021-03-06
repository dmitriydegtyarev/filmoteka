import axios from 'axios';
import { refs } from '../refs';
import api from '../api/apiService';
import regModal from '../components/regModal';
import { showMyLibrary } from '../components/exit-btn';
import {erroMessageRegister, erroMessageLogin} from '../components/errorMassageRegister';
import toastify from 'toastify-js';

const instance = axios.create({
  baseURL: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com/',
});
instance.defaults.headers.common['Authorization'] = 'AIzaSyAh4y3XVG_lP-Xp7JCesja84DGK8K-GOc0';

class FirebaseApi {
  #apiSets = {
    signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
    signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    dbBaseUrl: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com',
    DB_KEY: 'AIzaSyAh4y3XVG_lP-Xp7JCesja84DGK8K-GOc0',
  };
  email = '';
  #userInfo = JSON.parse(localStorage.getItem('userInfo'));

  get userInfo() {
    return this.#userInfo;
  }

  setuserInfo({ localId, idToken, email }) {
    this.#userInfo = { localId, idToken, email };
  }

  setBaseUrlSignUp() {
    instance.defaults.baseURL = this.#apiSets.signUp;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlSignIn() {
    instance.defaults.baseURL = this.#apiSets.signIn;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlDB(token) {
    if (token !== null) {
      instance.defaults.baseURL = this.#apiSets.dbBaseUrl;
      instance.defaults.params = { auth: token };
    }
  }

  signUp({ email, password }) {
    this.setBaseUrlSignUp();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => {
        toastify({
          text: 'Successfully registered',
          duration: 2500,
          className: 'toastify-center_successful',
        }).showToast();
        showMyLibrary();
        return data;
      });
  }

  signIn({ email, password }) {
    this.setBaseUrlSignIn();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => data)
      .then(({ localId, idToken }) => {
        localStorage.setItem('userInfo', JSON.stringify({ localId, idToken, email }));
        this.setuserInfo({ localId, idToken, email });
        refs.exitBtnEl.classList.remove('hidden');
        const LogInBtnEl = document.querySelector('.LogIn-btn');
        LogInBtnEl.textContent = `${email} logged in`;
        LogInBtnEl.classList.remove('hidden');
        refs.registrationBtn.classList.add('hidden');
      });
  }

  postWatchedData(data) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
  }

  postQueueData(data) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
  }

  getWatchedData() {
    console.log(this.setBaseUrlDB(this.#userInfo.idToken));
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .get(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
    // .then(transformToArr);
  }

  getQueueData() {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .get(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
    // .then(transformToArr);
  }

  deleteWatchedData(nameId) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .delete(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '/' + nameId + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteQueueData(nameId) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .delete(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '/' + nameId + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      });
  }

  findWatchedMovie(movieId) {
    return this.getWatchedData().then(result => {
      if (result === null) {
        return;
      }
      const nameId = Object.entries(result).find(([id, obj]) => obj.id === movieId);
      if (nameId !== undefined) {
        return nameId[0];
      }
    });
  }

  findQueueMovie(movieId) {
    return this.getQueueData().then(result => {
      if (result === null) {
        return;
      }
      const nameId = Object.entries(result).find(([id, obj]) => obj.id === movieId);
      if (nameId !== undefined) return nameId[0];
    });
  }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;

function transformToArr(obj) {
  if (obj !== undefined || null) {
    return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
  }
}

refs.signUpBtn.addEventListener('click', onSignUp);
refs.signInBtn.addEventListener('click', onSignIn);

function onSignUp(e) {
  e.preventDefault();
  const { email, password } = {
    email: refs.modalEl.elements['email'].value,
    password: refs.modalEl.elements['password'].value,
  };

  firebaseApi.signUp({ email, password }).then(() => {
    onSignIn(e);
  }).catch(erroMessageRegister);
}

function onSignIn(e) {
  e.preventDefault();
  const { email, password } = {
    email: refs.modalEl.elements['email'].value,
    password: refs.modalEl.elements['password'].value,
  };

  firebaseApi.signIn({ email, password }).then(() => {
    regModal.onRegModalWindowCloseBtn();
    // const LogInBtnEl = document.querySelector('.LogIn-btn');
    // LogInBtnEl.textContent = `${email} logged in`;
  })
  .catch(erroMessageLogin);

  showMyLibrary();
}
