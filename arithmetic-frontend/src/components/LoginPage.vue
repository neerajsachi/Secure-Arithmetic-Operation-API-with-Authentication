
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <div>
          <input type="text" v-model="username" id="username" required placeholder="Username">
          <input type="password" v-model="password" id="password" required placeholder="password">
          <br>
          <br>
        </div>
        <button type="submit">Login</button>
      </form>
      <br>
    <button @click="createUser">New User</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      ...mapActions(['login']),
      onLogin() {
        this.login({ username: this.username, password :this.password })
          .then(() => {
            this.$router.push('/calculate');
          })
          .catch(err => {
            alert('invalid username or password',err);
          });
      },
      createUser(){
        this.$router.push('/createUser')
      }
    }
  };
  </script>
  
  <style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 2px solid #111010;
  border-radius: 5px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  box-sizing: border-box;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  box-sizing: border-box;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 576px) {
  .login-container {
    padding: 1rem;
    border-width: 1px;
  }

  input {
    padding: 0.4rem;
  }

  button {
    padding: 0.6rem;
  }
}
</style>
  