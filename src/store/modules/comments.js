import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const state = {
  comments: []
};

const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  ADD_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  UPDATE_COMMENT(state, updatedComment) {
    const index = state.comments.findIndex(comment => comment.id === updatedComment.id);
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment);
    }
  },
  DELETE_COMMENT(state, commentId) {
    state.comments = state.comments.filter(comment => comment.id !== commentId);
  }
};

const actions = {
  async fetchComments({ commit }, { projectId, taskId }) {
    let q;
    if (taskId) {
      q = query(collection(db, 'comments'), where('taskId', '==', taskId));
    } else {
      q = query(collection(db, 'comments'), where('projectId', '==', projectId));
    }
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach(doc => {
      const comment = doc.data();
      comment.id = doc.id;
      comments.push(comment);
    });
    commit('SET_COMMENTS', comments);
  },
  async addComment({ commit }, comment) {
    const docRef = await addDoc(collection(db, 'comments'), comment);
    comment.id = docRef.id;
    commit('ADD_COMMENT', comment);
  },
  async updateComment({ commit }, comment) {
    await updateDoc(doc(db, 'comments', comment.id), comment);
    commit('UPDATE_COMMENT', comment);
  },
  async deleteComment({ commit }, commentId) {
    await deleteDoc(doc(db, 'comments', commentId));
    commit('DELETE_COMMENT', commentId);
  }
};

const getters = {
  comments: state => state.comments
};

export default {
  state,
  mutations,
  actions,
  getters
};
