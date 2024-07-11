<template>
    <div class="register container">
      <h1>Crear una Cuenta</h1>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <button @click="loginWithGoogle" class="btn btn-danger mt-3">Register with Google</button>
      <router-link to="/login" class="d-block mt-3">Ya tienes una cuenta? Iniciar sesión</router-link>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      ...mapActions(['register', 'loginWithGoogleAction']),
      async registerUser() {
        try {
          await this.register({ email: this.email, password: this.password });
          this.$router.push('/');
        } catch (error) {
          console.error("Error al registrar:", error);
        }
      },
      async loginWithGoogle() {
        try {
          await this.loginWithGoogleAction();
          this.$router.push('/');
        } catch (error) {
          console.error("Error al registrar con Google:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  