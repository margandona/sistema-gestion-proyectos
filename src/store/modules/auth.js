import { auth, googleProvider } from '../../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const state = {
  user: null
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

const actions = {
  async login({ commit }, { email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    commit('SET_USER', userCredential.user);
  },
  async loginWithGoogleAction({ commit }) {
    const userCredential = await signInWithPopup(auth, googleProvider);
    commit('SET_USER', userCredential.user);
  },
  async register({ commit }, { email, password }) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    commit('SET_USER', userCredential.user);
  },
  async logout({ commit }) {
    await signOut(auth);
    commit('SET_USER', null);
  }
};

const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user
};

export default {
  state,
  mutations,
  actions,
  getters
};
