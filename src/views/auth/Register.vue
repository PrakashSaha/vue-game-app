<template>
  <div class="register-container">
    <h1>Register</h1>
    <form class="register-form" @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Name" class="input-field" />
      <input v-model="email" type="email" placeholder="Email" class="input-field" />
      <input v-model="password" type="password" placeholder="Password" class="input-field" />
      <button type="submit" class="register-button">Register</button>
    </form>
    <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  await authStore.register({ name: name.value, email: email.value, password: password.value });
  if (authStore.isLoggedIn) {
    router.push('/'); // Redirect to login after registration
  }
};
</script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f3f8fe;
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 400px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #00a2ff;
  }
  
  .register-button {
    width: 100%;
    padding: 12px;
    background-color: #00a2ff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-button:hover {
    background-color: #007bbf;
  }
  
  .error-message {
    margin-top: 15px;
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  </style>
  