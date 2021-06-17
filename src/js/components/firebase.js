import axios from 'axios';
import { refs } from '../refs';
import api from '../api/apiService';
import regModal from '../components/regModal';

const instance = axios.create({
  baseURL: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com/',
});
instance.defaults.headers.common['Authorization'] = 'AIzaSyAh4y3XVG_lP - Xp7JCesja84DGK8K - GOc0';

class FirebaseApi {
  #apiSets = {
    signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
    signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    dbBaseUrl: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com',
    DB_KEY: 'AIzaSyAh4y3XVG_lP-Xp7JCesja84DGK8K-GOc0',
  };
  email = '';
  #userInfo = JSON.parse(localStorage.getItem('userInfo'));

  setBaseUrlSignUp() {
    instance.defaults.baseURL = this.#apiSets.signUp;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlSignIn() {
    instance.defaults.baseURL = this.#apiSets.signIn;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlDB(token) {
    instance.defaults.baseURL = this.#apiSets.dbBaseUrl;
    instance.defaults.params = { auth: token };
  }

  signUp({ email, password }) {
    this.setBaseUrlSignUp();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => data)
      .catch(function (error) {
        alert(error);
      });
  }

  signIn({ email, password }) {
    this.setBaseUrlSignIn();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => data)
      .then(({ localId, idToken }) => {
        localStorage.setItem('userInfo', JSON.stringify({ localId, idToken, email }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postWatchedData(data) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(console.log);
  }

  postQueueData(data) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(console.log);
  }

  getWatchedData() {
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
      .then(({ data }) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteQueueData(nameId) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .delete(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '/' + nameId + '.json')
      .then(console.log)
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
      console.log(result);
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
  console.log({ email, password });

  firebaseApi.signUp({ email, password });
}

function onSignIn(e) {
  e.preventDefault();
  const { email, password } = {
    email: refs.modalEl.elements['email'].value,
    password: refs.modalEl.elements['password'].value,
  };
  console.log({ email, password });

  firebaseApi.signIn({ email, password }).then(() => {
    regModal.onRegModalWindowCloseBtn();
    const regBtnText = document.querySelector('.registration-btn_text');
    regBtnText.textContent = `${email} logged in`;
    console.log('Successfully logged in');
  });
}
