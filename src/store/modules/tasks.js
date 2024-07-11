import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const state = {
  tasks: []
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
  }
};

const actions = {
  async fetchTasks({ commit }, projectId) {
    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach(doc => {
      const task = doc.data();
      task.id = doc.id;
      tasks.push(task);
    });
    commit('SET_TASKS', tasks);
  },
  async addTask({ commit }, task) {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    task.id = docRef.id;
    commit('ADD_TASK', task);
  },
  async updateTask({ commit }, task) {
    await updateDoc(doc(db, 'tasks', task.id), task);
    commit('UPDATE_TASK', task);
  },
  async deleteTask({ commit }, taskId) {
    await deleteDoc(doc(db, 'tasks', taskId));
    commit('DELETE_TASK', taskId);
  }
};

const getters = {
  tasks: state => state.tasks
};

export default {
  state,
  mutations,
  actions,
  getters
};
