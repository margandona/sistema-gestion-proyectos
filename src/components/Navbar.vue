<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Sistema de Gestión</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/projects">Proyectos</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="createNewTask">Nueva Tarea</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="createNewProject">Nuevo Proyecto</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a class="nav-link" href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout', 'addTask', 'addProject']),
    createNewTask() {
      alert('Crear nueva tarea');
    },
    createNewProject() {
      alert('Crear nuevo proyecto');
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
