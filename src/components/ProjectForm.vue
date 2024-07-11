<template>
    <div>
      <h2>{{ isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre del Proyecto</label>
          <input type="text" v-model="project.name" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea v-model="project.description" class="form-control" id="description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      projectToEdit: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        project: this.projectToEdit ? { ...this.projectToEdit } : {
          name: '',
          description: ''
        },
        isEdit: !!this.projectToEdit
      };
    },
    methods: {
      ...mapActions(['addProject', 'updateProject']),
      async submitForm() {
        try {
          if (this.isEdit) {
            await this.updateProject(this.project);
          } else {
            await this.addProject(this.project);
          }
          this.$emit('project-saved');
        } catch (error) {
          console.error('Error al guardar el proyecto:', error);
        }
      }
    }
  };
  </script>
  