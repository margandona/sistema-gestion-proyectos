import { createStore } from 'vuex';
import auth from './modules/auth';
import projects from './modules/projects';
import tasks from './modules/tasks';

const store = createStore({
  modules: {
    auth,
    projects,
    tasks
  }
});

export default store;
