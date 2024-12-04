<template>
  <div class="navbar">
    <div class="nav-logo">
      <a><h2>LOGO</h2></a>
    </div>

    <ul class="nav-menu">
      <div v-if="authStore.isLoggedIn">
        <router-link to="/">
          <a class="nav-menu-item">Games</a>
        </router-link>
        <router-link to="/results">
          <a class="nav-menu-item">Results</a>
        </router-link>
        <button class="logout" @click="handleLogout">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login">
          <a class="nav-menu-item">Login</a>
        </router-link>
        <router-link to="/register">
          <a class="nav-menu-item">Signup</a>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login'); // Redirect after logout
};

</script>

<style  scoped>

.navbar{
  max-height: 10vh;
  display: flex;
  padding: 12px;
  width: 100%;
  background-color: #000;
  color: #fff;
  align-items: center;
}

.nav-menu{
  display: block;
  margin: 8px 8px 8px auto;
}

.nav-logo{
  cursor: pointer;
}

.nav-menu-item{
  display: inline-block;
  text-decoration: none;
  color: white;
  width: 60px;
}

.nav-menu-item:hover{
  color: orange;
}

.nav-menu-item::after{
  content:'';
  display: block;
  height: 2px;
  width: 0%;
  background-color: orange;
  transition: width 0.5s ease;
}

.nav-menu-item:hover::after{
  width: 100%;
}

.nav-menu li{
  display: inline-block;
  margin: 0 10px  0 0;
  text-align: center;
}

.logout{
    background-color: white ;
    padding: 24px 10px;
    border-radius: 50%;
}
</style>