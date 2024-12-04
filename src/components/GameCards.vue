<template>
  <router-link :to="gameData.link" class="gamesCard-link">
    <div class="gamesCard">
      <img :src="gameData.imageSrc" :alt="gameData.gameName" class="game-image" />
      <span>{{ gameData.gameName }}</span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  gameData: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>

.gamesCard{
    width: 300px;
    margin: 20px;
    background-color: #8d8d8d;
    display: flex;
    flex-direction:column ;
    text-align: center;
    border-radius: 20px;
}

.gamesCard img{
    padding: 20px;
    height: auto;
    width: 300px; /* Make image take the full width of the card */
    height: 300px; 
    object-fit: fill;
}
.gamesCard span{
    padding: 20px;
    color: #fff;
    font-size: xx-large;
    align-content: center;
    justify-content: center;
}

.gamesCard-link {
  text-decoration: none; /* Removes underline */
  color: inherit;        /* Keeps the color consistent with the text inside */
  display: inline-block; /* Ensures block-level behavior for the link */
}
</style>