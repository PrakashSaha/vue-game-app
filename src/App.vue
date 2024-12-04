<template>
  <div class="container">
    <Sidenav />
    <router-view />

  </div>
</template>

<script setup>
import Sidenav from './components/Sidenav.vue';

</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
	
}

body {
	background: #f1f5f9;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;
}
main {
  flex: 1 1 0;
  padding: 2rem;
}
	
</style>