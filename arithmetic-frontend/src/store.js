
import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    accessToken: null,
    username: null
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.username = null;
    }
  },
  actions: {
    login({ commit }, authData) {
      return axios.post('http://localhost:3000/login', {
        username: authData.username,
        password: authData.password
      })
      .then(response => {
        commit('setAccessToken', response.data.accessToken);
        commit('setUsername', authData.username);
        console.log('AccessToken:', response.data.accessToken);
      });
    },
    logout({ commit }) {
      commit('clearAuthData');
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== null;
    }
  }
});
