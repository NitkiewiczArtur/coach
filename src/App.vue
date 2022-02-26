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
:root {
  --primary: #1e90ff;
  --white: #ffffff;
}

.app-wrapper {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  height: 100%;
  width: 100%;
  //overflow: hidden;
  display: flex;
  flex-direction: column;
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
    grid-column: 2 / 12;
    grid-row: 2 / 12;
    // overflow-y: scroll;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  &__content {
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    display: grid;
    justify-content: center;
    background-color: rgb(0, 0, 0);
    position: relative;
  }
}

a.nav-link {
  &:link {
    color: var(--white);
    text-decoration: none;
  }

  &:visited {
    color: var(--white);
    text-decoration: none;
  }

  &:hover {
    color: #336699;
    text-decoration: none;
  }

  &:active {
    color: var(--white);
    text-decoration: none;
  }
}

.error {
  background-color: yellow;
  border-radius: 5px;
  padding: 5px;
}
</style>
