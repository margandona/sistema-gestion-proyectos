<template>
    <div class="sidebar bg-light p-3">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/">Tablero Principal</router-link>
        </li>
        <li class="list-group-item" v-for="project in projects" :key="project.id">
          <router-link :to="`/project/${project.id}`">{{ project.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['projects'])
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    overflow-y: auto;
  }
  </style>
  