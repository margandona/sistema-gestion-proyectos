<template>
    <div>
      <h3>Asignar Miembros</h3>
      <form @submit.prevent="assignMembers">
        <div class="form-group">
          <label for="members">Miembros</label>
          <select v-model="selectedMembers" class="form-control" id="members" multiple>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.email }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Asignar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    props: {
      projectId: {
        type: String,
        required: true
      },
      initialMembers: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        selectedMembers: [...this.initialMembers]
      };
    },
    computed: {
      ...mapGetters(['users'])
    },
    methods: {
      ...mapActions(['fetchUsers', 'updateProject']),
      async assignMembers() {
        try {
          const project = {
            id: this.projectId,
            members: this.selectedMembers
          };
          await this.updateProject(project);
          this.$emit('members-assigned');
        } catch (error) {
          console.error('Error al asignar miembros:', error);
        }
      }
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  