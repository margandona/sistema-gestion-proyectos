<template>
    <div>
      <h3>Comentarios</h3>
      <form @submit.prevent="submitComment">
        <div class="form-group">
          <label for="comment">Agregar comentario</label>
          <textarea v-model="newComment" class="form-control" id="comment" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Comentar</button>
      </form>
      <ul class="list-group mt-3">
        <li class="list-group-item" v-for="comment in comments" :key="comment.id">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p>{{ comment.text }}</p>
              <small>{{ comment.author }}</small>
            </div>
            <div>
              <button class="btn btn-warning btn-sm mr-2" @click="editComment(comment)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteComment(comment.id)">Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    props: {
      projectId: {
        type: String,
        required: false
      },
      taskId: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        newComment: '',
        currentComment: null
      };
    },
    computed: {
      ...mapGetters(['comments'])
    },
    methods: {
      ...mapActions(['fetchComments', 'addComment', 'updateComment', 'deleteComment']),
      async submitComment() {
        try {
          const comment = {
            text: this.newComment,
            author: 'User', // replace with actual user info
            projectId: this.projectId || null,
            taskId: this.taskId || null
          };
          if (this.currentComment) {
            comment.id = this.currentComment.id;
            await this.updateComment(comment);
          } else {
            await this.addComment(comment);
          }
          this.newComment = '';
          this.currentComment = null;
          this.fetchComments({ projectId: this.projectId, taskId: this.taskId });
        } catch (error) {
          console.error('Error al agregar comentario:', error);
        }
      },
      editComment(comment) {
        this.currentComment = { ...comment };
        this.newComment = comment.text;
      },
      async deleteComment(commentId) {
        try {
          await this.deleteComment(commentId);
          this.fetchComments({ projectId: this.projectId, taskId: this.taskId });
        } catch (error) {
          console.error('Error al eliminar comentario:', error);
        }
      }
    },
    created() {
      this.fetchComments({ projectId: this.projectId, taskId: this.taskId });
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  .list-group-item {
    margin-bottom: 10px;
  }
  </style>
  