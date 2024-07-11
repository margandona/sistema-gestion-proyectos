const state = {
    notifications: []
  };
  
  const mutations = {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationId) {
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    }
  };
  
  const actions = {
    addNotification({ commit }, notification) {
      const id = Date.now();
      commit('ADD_NOTIFICATION', { ...notification, id });
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', id);
      }, 5000);
    }
  };
  
  const getters = {
    notifications: state => state.notifications
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };
  