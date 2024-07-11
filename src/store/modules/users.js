import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const state = {
  users: []
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

const actions = {
  async fetchUsers({ commit }) {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach(doc => {
      const user = doc.data();
      user.id = doc.id;
      users.push(user);
    });
    commit('SET_USERS', users);
  }
};

const getters = {
  users: state => state.users
};

export default {
  state,
  mutations,
  actions,
  getters
};
