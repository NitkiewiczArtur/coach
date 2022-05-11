<template>
  <div v-if="error" class="modal">
    <div class="modal__content">
      <div class="card-title">
        <h2>ERROR</h2>
      </div>
      <div class="error-wrapper">
        {{ error }}
      </div>
      <div class="button-wrapper">
        <button class="button button--cancel" @click="dismissError">DISMISS ERROR</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {store} from "@/store";
import {computed} from "vue";

const error = computed(() => store.state.error)
const dismissError = () => {
  store.dispatch('setError', null)
}
</script>

<style lang="scss" scoped>
@use "../../styles/components/modal";
@use "../../styles/components/button";
@use "../../styles/variables" as v;

.card-title {
  text-align: left;
  background-color: v.$danger;
  margin: 0 0 1rem 0;
  border-radius: 10px 10px 0 0;
  color: #f3f3f3;
  width: inherit;
  font-size: 1.17em;
}

h2 {
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 0;
  font-size: 1.5rem;
}

.modal__content {
  padding: 0;
  border-radius: 10px 10px 10px 10px;
}

.error-wrapper {
  margin-bottom: 1rem;
}

.button-wrapper {
  margin-bottom: 1rem;
  width: inherit;
  display: inline-flex;
  justify-content: flex-end;
  padding-right:2rem;
}
</style>
