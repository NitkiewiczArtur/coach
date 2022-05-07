<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ErrorMessage from "@/components/common/ErrorMessage.vue";</script>

<template>
  <div class="app-wrapper">
    <div class="navbar">
      <NavBar/>
    </div>
    <div class="content">
      <suspense>
        <RouterView/>
      </suspense>
      <loading-spinner/>
      <error-message/>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles/variables" as v;
@use "styles/app-layout";
@use "styles/components/nav-link";
</style>
