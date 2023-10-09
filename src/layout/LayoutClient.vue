<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Navbar />
  <div class="wrapper">
    <div class="main-content-homepage_hot">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
.wrapper {
  margin-top: 57px;
}
@media screen and (max-width: 968px) {
  .wrapper {
    margin-top: 102px;
  }
}
</style>
