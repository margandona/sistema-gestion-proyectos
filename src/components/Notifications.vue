<template>
  <div class="notifications">
    <div class="notification alert alert-info" v-for="notification in notifications" :key="notification.id">
      <p>{{ notification.message }}</p>
      <button type="button" class="close" @click="removeNotification(notification.id)">
        <span>&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['notifications'])
  },
  methods: {
    ...mapActions(['removeNotification'])
  }
};
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  width: 300px;
}
.notification {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
</style>
