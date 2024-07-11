<template>
  <div class="main-layout d-flex flex-column">
    <Navbar />
    <div class="d-flex flex-grow-1">
      <Sidebar class="d-none d-md-block" />
      <div class="content p-3 flex-grow-1">
        <router-view />
      </div>
    </div>
    <Notifications />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Notifications from '@/components/Notifications.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Notifications
  }
};
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
.content {
  overflow-y: auto;
}
</style>
