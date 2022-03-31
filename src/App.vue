<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";</script>

<template>
  <div class="app-wrapper">
    <div class="navbar">
      <NavBar/>
    </div>
    <div class="content">
      <suspense>
        <RouterView/>
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
  display: flex;
  flex-direction: column;
}

.content {
  overflow: auto;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
/*
@media screen and (min-width: 700px) {
  .hide-for-desktop{
    display:unset;
  }
}
@media screen and (max-width: 700px) {
  .hide-for-desktop{
    display:none;
  }
}*/

@media screen and (max-width: 700px) {
  .navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
  .content {
    padding-top: 2rem;
    padding-bottom: 3rem;
  }
}

@media screen and (min-width: 700px) {
  .app-wrapper {
    font-size: 16px;
    width: 100%;
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
    padding-top: 1rem;
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
