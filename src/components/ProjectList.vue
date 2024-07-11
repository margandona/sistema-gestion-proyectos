<template>
    <div>
      <h2>Proyectos</h2>
      <button class="btn btn-primary mb-3" @click="showProjectForm(null)">Nuevo Proyecto</button>
      <ul class="list-group">
        <li class="list-group-item" v-for="project in projects" :key="project.id">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>{{ project.name }}</h5>
              <p>{{ project.description }}</p>
            </div>
            <div>
              <button class="btn btn-warning btn-sm mr-2" @click="showProjectForm(project)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteProject(project.id)">Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
      <ProjectForm v-if="currentProject" :projectToEdit="currentProject" @project-saved="fetchProjects" />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import ProjectForm from './ProjectForm.vue';
  
  export default {
    components: {
      ProjectForm
    },
    data() {
      return {
        currentProject: null
      };
    },
    computed: {
      ...mapGetters(['projects'])
    },
    methods: {
      ...mapActions(['fetchProjects', 'deleteProject']),
      showProjectForm(project) {
        this.currentProject = project ? { ...project } : null;
      }
    },
    created() {
      this.fetchProjects();
    }
  };
  </script>
  