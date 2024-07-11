<template>
  <div class="board d-flex flex-column flex-md-row">
    <div class="board-column flex-grow-1" v-for="status in statuses" :key="status">
      <div class="d-flex justify-content-between align-items-center">
        <h3>{{ status }}</h3>
        <button class="btn btn-primary btn-sm" @click="createTask(status)">Agregar Tarea</button>
      </div>
      <draggable
        class="task-list"
        :list="tasksByStatus(status)"
        group="tasks"
        @end="onDragEnd"
        :data-status="status"
      >
        <template #item="{element}">
          <li
            class="list-group-item"
            :key="element.id"
            :data-id="element.id"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5>{{ element.name }}</h5>
                <p>{{ element.description }}</p>
              </div>
              <div>
                <button class="btn btn-warning btn-sm mr-2" @click="editTask(element)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="deleteTask(element.id)">Eliminar</button>
              </div>
            </div>
            <Comments :taskId="element.id" />
          </li>
        </template>
      </draggable>
    </div>
    <TaskForm v-if="currentTask" :taskToEdit="currentTask" :projectId="projectId" @task-saved="fetchTasks" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import draggable from 'vuedraggable';
import TaskForm from './TaskForm.vue';
import Comments from './Comments.vue';

export default {
  components: {
    TaskForm,
    draggable,
    Comments
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
    ...mapActions(['fetchTasks', 'updateTask', 'deleteTask', 'addTask']),
    editTask(task) {
      this.currentTask = task ? { ...task } : null;
    },
    async deleteTask(taskId) {
      try {
        await this.deleteTask(taskId);
        this.fetchTasks(this.projectId);
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    },
    async onDragEnd(evt) {
      const taskId = evt.item.dataset.id;
      const newStatus = evt.to.dataset.status;
      const task = this.tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        task.status = newStatus;
        await this.updateTask(task);
        this.fetchTasks(this.projectId);
      }
    },
    async createTask(status) {
      try {
        const task = {
          name: 'Nueva Tarea',
          description: '',
          status,
          projectId: this.projectId,
          assignee: '',
        };
        await this.addTask(task);
        this.fetchTasks(this.projectId);
      } catch (error) {
        console.error('Error al crear tarea:', error);
      }
    }
  },
  created() {
    this.fetchTasks(this.projectId);
  }
};
</script>

<style scoped>
.board {
  gap: 15px;
  flex-wrap: wrap;
}
.board-column {
  min-width: 300px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}
.list-group-item {
  margin-bottom: 10px;
}
</style>
