<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MainLayout
  }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import '@fortawesome/fontawesome-free/css/all.css';

body {
  font-family: 'Nunito', sans-serif;
}
</style>
