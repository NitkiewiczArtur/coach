<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
      <div class="filters">
        filters {{ isMobileScreen ? "▲" : "▼" }}
      </div>
      <input v-model="searchValue"/>
      <div @click="onSearchFromStart"
           class="button button--submit">
        search
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";

const searchValue = ref('')
const emit = defineEmits(['searchClicked'])
const onSearchFromStart = () => {
  emit('searchClicked', searchValue.value)
}
const isMobileScreen = computed(() => {
  return window.innerWidth < 700
})
</script>

<style scoped lang="scss">
@use "../styles/mixins";
@use "../styles/variables" as v;
@use "../styles/components/button";

.search-bar-wrapper {
  @include mixins.flex-column-center
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: v.$primary-color;
  color: v.$secondary-color;
  padding: 0 1rem 0 1rem;
  border-radius: 10px;
  height: 3rem;

  input {
    margin: 0 1rem 0 1rem;
    padding: 0.25rem;
  }
}

/*.ddwn-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 1rem 1rem 0 1rem;
  border-right: solid 2px #A9B1BD;
  max-width: 6.5rem;
  min-width: 6.5rem;
  width: 6.5rem;
}

.selected-key {
  min-width: 6.5rem;
  width: 6.5rem;
  display: flex;
}

ul {
  margin: 0;
  display: none;
  position: absolute;
  top: 3.63rem;
  left: -2px;
  transition-delay: 2s;
  padding: 0;
  border-right: solid 2px #A9B1BD;
  border-left: solid 2px #A9B1BD;
  border-bottom: solid 2px #A9B1BD;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
}

ul li {
  list-style: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
  max-height: 2.5rem;
  width: 6.38rem;
  padding: 1rem 1rem 0 1rem;
  border-bottom: solid 2px #A9B1BD;
}

li:last-child {
  border-bottom: none;
}

ul:hover {
  display: flex;
}

.ddwn-menu:hover ul {
  display: block;
  cursor: pointer;
}

.searchBar {
  list-style: none;
  display: flex;
  padding: 0;
  border-radius: 10px;
  border: solid 2px #A9B1BD;
  box-sizing: unset;
  cursor: default;

  &__item {
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-right: solid 2px #A9B1BD;
    height: 3.5rem;

    &:hover {
      color: #A9B1BD;
    }

    & p {
      margin: 0;
    }

    &--title {
      display: none;
    }

    &--input-container {
      flex-direction: row;
      justify-content: space-between;
    }

    &__input {
      outline: none;
      border: none;
      color: #A9B1BD;
      max-width: 7.5rem;
    }

    &__icon {
      padding: 0.7rem 1.25rem 0 0;
      font-size: 2rem;
      cursor: pointer;
      color: #11B0C8;
    }

    &:last-child {
      border-right: none;
    }
  }
}

@media screen and (min-width: 1000px) {
  .selected-key {
    justify-content: space-between;
  }

  ul li {
    width: 6.47rem;
  }

  .searchBar {
    max-width: 31.5rem;

    &__item {
      &--title {
        display: flex;
        width: 6.5rem;
        min-width: 6.5rem;
        justify-content: center;
      }

      &__input {
        max-width: 11.25rem;
      }
    }
  }

  *, ::after, ::before {
    box-sizing: content-box;
  }
}*/
</style>
