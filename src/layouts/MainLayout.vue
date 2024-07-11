<template>
    <div class="main-layout">
      <Navbar />
      <div class="d-flex">
        <Sidebar />
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: {
      Navbar,
      Sidebar
    }
  };
  </script>
  
  <style scoped>
  .main-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  </style>
  