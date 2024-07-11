<template>
  <div class="projects container">
    <h1>Proyectos</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="project in projects" :key="project.id">
        <router-link :to="`/project/${project.id}`">{{ project.name }}</router-link>
      </li>
    </ul>
    <button class="btn btn-primary mt-3" @click="createProject">Crear Nuevo Proyecto</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['projects'])
  },
  methods: {
    ...mapActions(['addProject']),
    async createProject() {
      try {
        const project = {
          name: 'Nuevo Proyecto',
          description: 'Descripción del nuevo proyecto'
        };
        await this.addProject(project);
      } catch (error) {
        console.error('Error al crear proyecto:', error);
      }
    }
  }
};
</script>

<style scoped>
.projects {
  padding: 20px;
}
</style>
