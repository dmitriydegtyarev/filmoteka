import axios from 'axios';
import { refs } from '../refs';
import api from '../api/apiService';
import regModal from '../components/regModal';

const instance = axios.create({
  baseURL: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com/',
});
instance.defaults.headers.common['Authorization'] = 'AIzaSyAh4y3XVG_lP - Xp7JCesja84DGK8K - GOc0';

// fetch('https://filmoteka-zero-team-default-rtdb.firebaseio.com/users.json')
//   .then(response => {
//     return response.json();
//   })
//   .then(data => Object.entries(data).map(([key, value]) => ({ id: key, ...value })))
//   .then(console.log);

class FirebaseApi {
  #apiSets = {
    signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
    signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    dbBaseUrl: 'https://filmoteka-zero-team-default-rtdb.firebaseio.com',
    DB_KEY: 'AIzaSyAh4y3XVG_lP-Xp7JCesja84DGK8K-GOc0',
  };
  #userInfo = JSON.parse(localStorage.getItem('userInfo'));

  setBaseUrlSignUp() {
    // this.#baseURL = this.#apiSets.signUp;
    instance.defaults.baseURL = this.#apiSets.signUp;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlSignIn() {
    // this.#baseURL = this.#apiSets.signIn;
    instance.defaults.baseURL = this.#apiSets.signIn;
    instance.defaults.params = { key: this.#apiSets.DB_KEY };
  }

  setBaseUrlDB(token) {
    // this.#baseURL = this.#apiSets.dbBaseUrl;
    instance.defaults.baseURL = this.#apiSets.dbBaseUrl;
    instance.defaults.params = { auth: token };
  }

  // signUp({ email, password }) {
  //   this.setBaseUrlSignUp();
  //   const newUser = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   };
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newUser),
  //   };
  //   return fetch(`${this.#baseURL}?key=${this.#apiSets.DB_KEY}`, options)
  //     .then(res => res.json())
  //     .then(console.log);
  // }

  signUp({ email, password }) {
    this.setBaseUrlSignUp();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => data)
      .catch(function (error) {
        alert(error);
      });
  }

  // signIn({ email, password }) {
  //   this.setBaseUrlSignIn();
  //   const user = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   };
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(user),
  //   };
  //   return fetch(`${this.#baseURL}?key=${this.#apiSets.DB_KEY}`, options).then(res => res.json());
  // }

  signIn({ email, password }) {
    this.setBaseUrlSignIn();

    return instance
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => data)
      .then(({ localId, idToken }) => {
        localStorage.setItem('userInfo', JSON.stringify({ localId, idToken }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // postWatchedMovies({ data, userId, token }) {
  //   this.setBaseUrlDB();
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   };
  //   return fetch(`${this.#baseURL}/users/${userId}/watched.json?auth=${token}`, options).then(res =>
  //     res.json(),
  //   );
  // }

  postWatchedData({ data }) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(console.log);
  }

  // postQuequedMovies({ data, userId, token }) {
  //   this.setBaseUrlDB();
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   };
  //   return fetch(`${this.#baseURL}/users/${userId}/queque.json?auth=${token}`, options).then(res =>
  //     res.json(),
  //   );
  // }

  postQueueData({ data }) {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .post(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '.json', data)
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(console.log);
  }

  // getWatchedMovies({ userId, token }) {
  //   this.setBaseUrlDB();
  //   return fetch(`${this.#baseURL}/users/${userId}/watched.json?auth=${token}`).then(res =>
  //     res.json(),
  //   );
  // }

  getWatchedData() {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .get(/users/ + this.#userInfo.localId + '/' + 'watchedMovies' + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(transformToArr);
  }

  getQueueData() {
    this.setBaseUrlDB(this.#userInfo.idToken);
    return instance
      .get(/users/ + this.#userInfo.localId + '/' + 'queueMovies' + '.json')
      .then(({ data }) => data)
      .catch(function (error) {
        console.log(error);
      })
      .then(transformToArr);
  }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi; // firebaseApi.signIn({ email: 'user6@mail.com', password: '666666' });

// firebaseApi.postWatchedData({
//   data: { film: 'Dog', genre: 'drama' },
// });

// firebaseApi.getWatchedData();
// firebaseApi.getQueueData();

function transformToArr(obj) {
  return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
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
