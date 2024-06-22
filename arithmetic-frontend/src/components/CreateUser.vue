<template>
    <div class="create-container">
        <h1>Create User</h1>
        <form @submit="createUser">
            <div>
                <input type="text" v-model="username" id="username" required placeholder="Username">
                <br>
                <input type="password" v-model="password" id="password" required placeholder="password">
                <br>
                <br>
            </div>
            <button type="submit">Create</button>
      </form>
      <br>
      <button  @click="back">Back</button>
    </div>
</template>


<script>
import axios from 'axios';

export default{
    methods:{
        data() {
            return {
                username: '',
                password: ''
            };
        },
        async createUser() {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.username,
                    password: this.password
                });
                if (response.status === 201) {
                    alert('User created successfully');
                } else {
                    alert('Error creating user');
                }
            } catch (error) {
                console.error('There was an error creating the user:', error);
                alert('There was an error creating the user.');
            }
        },

        back(){
            this.$router.push('/')
        }
    }
};
</script>



<style scoped>
.create-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 2px solid #111010;
    border-radius: 5px;
    text-align: center;
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
    .create-container {
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
