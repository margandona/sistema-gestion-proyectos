<template>
    <div class="project container">
      <h1>{{ project.name }}</h1>
      <Board />
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import Board from '@/components/Board.vue';
  
  export default {
    components: {
      Board
    },
    data() {
      return {
        project: {}
      };
    },
    methods: {
      ...mapActions(['fetchTasks']),
      async loadProject() {
        const projectId = this.$route.params.id;
        this.project = { id: projectId, name: `Proyecto ${projectId}` };
        await this.fetchTasks(projectId);
      }
    },
    created() {
      this.loadProject();
    }
  };
  </script>
  
  <style scoped>
  .project {
    padding: 20px;
  }
  </style>
  