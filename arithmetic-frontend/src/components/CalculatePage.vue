<template>
    <div class="calc-container">
      <h1>Calculate</h1>
      <form @submit.prevent="onCalculate">
        <div>
          <label for="num1">Number 1:</label>
          <input type="number" v-model="num1" id="num1" required />
        </div>
        <br>
        <div>
          <label for="num2">Number 2:</label>
          <input type="number" v-model="num2" id="num2" required />
        </div>
        <br>
        <div>
          <label for="operation">Operation:</label>
          <select v-model="operation" id="operation" required>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </div>
        <br>
        <button type="submit">Calculate</button>
      </form>
      <br>
      <button @click="logout">logout</button>
      <div v-if="result !== null">
        <h2>Result: {{ result }}</h2>
      </div>
      <div v-if="errorMessage" class="error">
        <h2>Error: {{ errorMessage }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        num1: 0,
        num2: 0,
        operation: 'add',
        result: null,
        errorMessage: ''
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      ...mapActions(['logout']),
      async onCalculate() {
        try {
          this.errorMessage = ''; 
          this.result = null; 
          let response;
          const config = {
            headers: { Authorization: `Bearer ${this.$store.state.accessToken}`}
          }
          console.log(config)
          switch (this.operation) {
            case 'add':
              response = await axios.get(`http://localhost:3000/add?num1=${this.num1}&num2=${this.num2}`, config);
              break;
            case 'subtract':
              response = await axios.get(`http://localhost:3000/subtract?num1=${this.num1}&num2=${this.num2}`, config);
              break;
            case 'multiply':
              response = await axios.get(`http://localhost:3000/multiply?num1=${this.num1}&num2=${this.num2}`, config);
              break;
            case 'divide':
              if (this.num2 == 0) {
                this.errorMessage = 'Cannot divide by zero';
                return;
              }
              response = await axios.get(`http://localhost:3000/divide?num1=${this.num1}&num2=${this.num2}`, config);
              break;
          }
          this.result = response.data.result;
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'An error occurred while calculating. Please try again.';
          }
          console.error('Failed to calculate', error);
        }
      },
      logout(){
        this.$router.push('/')
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  .calc-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 2px solid #111010;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
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
    .calc-container {
      padding: 1rem;
      border-width: 1px;
    }
  
    input, select {
      padding: 0.4rem;
    }
  
    button {
      padding: 0.6rem;
    }
  }
  </style>
  