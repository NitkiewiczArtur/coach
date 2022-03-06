<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="app-wrapper grid">
    <div class="navbar">
      <NavBar />
    </div>
    <div class="content">
      <suspense>
        <RouterView />
      </suspense>
    </div>
  </div>
</template>

<style lang="scss">
@use "../src/styles/variables" as v;

.app-wrapper {
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  height: 100vh;
  width: 100vw;
  background-color: v.$background;
  color: v.$primary-color;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}

@media screen and (min-width: 700px) {
  .app-wrapper {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    height: 100%;
    width: 100%;
    //overflow: hidden;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
  }
  .navbar {
    grid-column: 1 / -1;
  }

  .sidebar {
    grid-column: 1 / 1;
    grid-row: 2 / 4;
  }

  .content {
    grid-column: 1 / 12;
    grid-row: 2 / 12;
    // overflow-y: scroll;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
}

a.nav-link {
  &:link {
    color: v.$secondary-color;
    text-decoration: none;
  }

  &:visited {
    color: v.$secondary-color;
    text-decoration: none;
  }

  &:hover {
    color: v.$info;
    text-decoration: none;
  }

  &:active {
    color: v.$secondary-color;
    text-decoration: none;
  }
}

.error {
  background-color: yellow;
  border-radius: 5px;
  padding: 5px;
}
</style>
