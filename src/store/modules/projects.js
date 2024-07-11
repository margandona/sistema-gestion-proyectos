import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const state = {
  projects: []
};

const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects;
  },
  ADD_PROJECT(state, project) {
    state.projects.push(project);
  },
  UPDATE_PROJECT(state, updatedProject) {
    const index = state.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject);
    }
  },
  DELETE_PROJECT(state, projectId) {
    state.projects = state.projects.filter(project => project.id !== projectId);
  }
};

const actions = {
  async fetchProjects({ commit }) {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = [];
    querySnapshot.forEach(doc => {
      const project = doc.data();
      project.id = doc.id;
      projects.push(project);
    });
    commit('SET_PROJECTS', projects);
  },
  async addProject({ commit }, project) {
    const docRef = await addDoc(collection(db, 'projects'), project);
    project.id = docRef.id;
    commit('ADD_PROJECT', project);
  },
  async updateProject({ commit }, project) {
    await updateDoc(doc(db, 'projects', project.id), project);
    commit('UPDATE_PROJECT', project);
  },
  async deleteProject({ commit }, projectId) {
    await deleteDoc(doc(db, 'projects', projectId));
    commit('DELETE_PROJECT', projectId);
  }
};

const getters = {
  projects: state => state.projects
};

export default {
  state,
  mutations,
  actions,
  getters
};
