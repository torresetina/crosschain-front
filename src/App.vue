<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div id = app>
    <div >
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  @font-face {
    font-family: 'Noto Sans';
    src: url("./assets/NotoSans.ttf");
  }

  #app {
  font-family: 'Noto Sans';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
}
  
</style>
