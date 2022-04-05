<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
<!--      <div class="filters">
        name {{ isMobileScreen ? "▲" : "▼" }}
      </div>-->
      <input v-model="searchValue"/>
      <div @click="onSearchFromStart"
           class="button button--purple">
        search
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const searchValue = ref('')
const emit = defineEmits(['searchClicked'])
const onSearchFromStart = () => {
  emit('searchClicked', searchValue.value)
}
</script>

<style scoped lang="scss">
@use "../styles/mixins";
@use "../styles/variables" as v;
@use "../styles/components/button";

.search-bar-wrapper {
  @include mixins.flex-column-center
}

.search-bar {
  @include mixins.flex-row-center;
  background-color: v.$primary-color;
  color: v.$secondary-color;
  padding: 0 1rem 0 1rem;
  border-radius: 10px;
  height: 3rem;
  margin-bottom: 0.2rem;
  input {
    margin: 0 1rem 0 1rem;
    padding: 0.25rem;
  }
}
</style>
