<template>
    <div>
      <h1>Calculate</h1>
      <form @submit.prevent="onCalculate">
        <div>
          <label for="num1">Number 1:</label>
          <input type="number" v-model="num1" id="num1" required />
        </div>
        <div>
          <label for="num2">Number 2:</label>
          <input type="number" v-model="num2" id="num2" required />
        </div>
        <div>
          <label for="operation">Operation:</label>
          <select v-model="operation" id="operation" required>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>
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
          this.errorMessage = ''; // Reset error message
          this.result = null; // Reset result
          let response;
          const config = {
            headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
          };
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
      }
    }
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  