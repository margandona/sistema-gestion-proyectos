import { createStore } from 'vuex';
import auth from './modules/auth';
import projects from './modules/projects';
import tasks from './modules/tasks';
import users from './modules/users';
import notifications from './modules/notifications';
import comments from './modules/comments';

const store = createStore({
  modules: {
    auth,
    projects,
    tasks,
    users,
    notifications,
    comments
  }
});

export default store;
