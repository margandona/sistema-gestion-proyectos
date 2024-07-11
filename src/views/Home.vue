<template>
  <div class="home container">
    <h1>Bienvenido al Sistema de Gestión de Proyectos</h1>
    <ProjectList />
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';

export default {
  name: 'Home',
  components: {
    ProjectList
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
