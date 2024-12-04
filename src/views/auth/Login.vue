<template>
  <div class="login-container">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="input-field" />
      <input v-model="password" type="password" placeholder="Password" class="input-field" />
      <button type="submit" class="login-button">Login</button>
    </form>
    <!-- Show error message only if it's set in authStore.error -->
    <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

// Handle login
const handleLogin = async () => {
  await authStore.login(email.value, password.value); // Attempt to login
  if (authStore.isLoggedIn) {
    router.push('/'); // Redirect on successful login
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.login-form {
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
}

.input-field:focus {
  outline: none;
  border-color: #00ff15;
}

.login-button {
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

.login-button:hover {
  background-color: #00b318;
}

.error-message {
  margin-top: 15px;
  color: red;
  font-size: 0.9rem;
  text-align: center;
}
</style>
