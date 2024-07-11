<template>
    <div>
      <h2>Tareas</h2>
      <button class="btn btn-primary mb-3" @click="showTaskForm(null)">Nueva Tarea</button>
      <div class="board">
        <div class="board-column" v-for="status in statuses" :key="status">
          <h3>{{ status }}</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="task in tasksByStatus(status)" :key="task.id">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{{ task.name }}</h5>
                  <p>{{ task.description }}</p>
                </div>
                <div>
                  <button class="btn btn-warning btn-sm mr-2" @click="showTaskForm(task)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Eliminar</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <TaskForm v-if="currentTask" :taskToEdit="currentTask" :projectId="projectId" @task-saved="fetchTasks" />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: {
      TaskForm
    },
    props: {
      projectId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        currentTask: null,
        statuses: ['To Do', 'In Progress', 'Done']
      };
    },
    computed: {
      ...mapGetters(['tasks']),
      tasksByStatus() {
        return (status) => {
          return this.tasks.filter(task => task.status === status && task.projectId === this.projectId);
        };
      }
    },
    methods: {
      ...mapActions(['fetchTasks', 'deleteTask']),
      showTaskForm(task) {
        this.currentTask = task ? { ...task } : null;
      }
    },
    created() {
      this.fetchTasks(this.projectId);
    }
  };
  </script>
  
  <style scoped>
  .board {
    display: flex;
    gap: 15px;
  }
  .board-column {
    flex: 1;
    min-width: 200px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 8px;
  }
  .list-group-item {
    margin-bottom: 10px;
  }
  </style>
  