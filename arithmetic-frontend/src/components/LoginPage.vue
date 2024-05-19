<!-- src/components/LoginPage.vue -->
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: ''
      };
    },
    methods: {
      ...mapActions(['login']),
      onLogin() {
        this.login({ username: this.username })
          .then(() => {
            this.$router.push('/calculate');
          })
          .catch(err => {
            console.error('Failed to login', err);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  