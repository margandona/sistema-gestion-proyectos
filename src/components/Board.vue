<template>
    <div class="board">
      <div class="board-column" v-for="(tasks, status) in groupedTasks" :key="status">
        <h2>{{ status }}</h2>
        <div class="task" v-for="task in tasks" :key="task.id">
          <Task :task="task" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import Task from './Task.vue';
  
  export default {
    components: {
      Task
    },
    computed: {
      ...mapGetters(['tasks']),
      groupedTasks() {
        return this.tasks.reduce((groups, task) => {
          const status = task.status || 'Pendiente';
          if (!groups[status]) {
            groups[status] = [];
          }
          groups[status].push(task);
          return groups;
        }, {});
      }
    }
  }
  </script>
  
  <style scoped>
  .board {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .board-column {
    flex: 1;
    min-width: 200px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 8px;
  }
  .task {
    margin-bottom: 10px;
  }
  </style>
  