<template>
    <div class="login container">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <button @click="loginWithGoogle" class="btn btn-danger mt-3">Login with Google</button>
      <router-link to="/register" class="d-block mt-3">Crear una cuenta</router-link>
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
      ...mapActions(['login', 'loginWithGoogleAction']),
      async loginUser() {
        try {
          await this.login({ email: this.email, password: this.password });
          this.$router.push('/');
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      },
      async loginWithGoogle() {
        try {
          await this.loginWithGoogleAction();
          this.$router.push('/');
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  