<template>
    <div class="task-card card">
      <div class="card-body">
        <h5 class="card-title">{{ task.name }}</h5>
        <p class="card-text">{{ task.description }}</p>
        <div class="task-actions">
          <button @click="editTask" class="btn btn-warning btn-sm">Edit</button>
          <button @click="deleteTask" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions(['updateTask', 'deleteTask']),
      editTask() {
        // Implement edit functionality
        console.log("Edit task", this.task);
      },
      async deleteTask() {
        try {
          await this.deleteTask(this.task.id);
        } catch (error) {
          console.error("Error al eliminar tarea:", error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .task-card {
    margin-bottom: 10px;
  }
  </style>
  