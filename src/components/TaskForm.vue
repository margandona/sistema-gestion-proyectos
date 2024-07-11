<template>
  <div>
    <b-modal id="task-modal" title="Task Form" @ok="submitForm">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre de la Tarea</label>
          <input type="text" v-model="task.name" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea v-model="task.description" class="form-control" id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="assignee">Asignado a</label>
          <select v-model="task.assignee" class="form-control" id="assignee">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.email }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Estado</label>
          <select v-model="task.status" class="form-control" id="status">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BModal } from 'bootstrap-vue';

export default {
  components: {
    BModal
  },
  props: {
    taskToEdit: {
      type: Object,
      default: () => null
    },
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      task: this.taskToEdit ? { ...this.taskToEdit } : {
        name: '',
        description: '',
        assignee: '',
        status: 'To Do',
        projectId: this.projectId
      },
      isEdit: !!this.taskToEdit
    };
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions(['addTask', 'updateTask', 'fetchUsers']),
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.updateTask(this.task);
        } else {
          await this.addTask(this.task);
        }
        this.$emit('task-saved');
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
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
