<template>
  <template v-for="error in errors" :key="error">
    <p v-if="error">
      {{ error }}
    </p>
  </template>
</template>
<script setup lang="ts">
import {PropType} from "vue";

const props = defineProps({
  errors: {
    type: Array as PropType<string[]>
  },
})
</script>

<style scoped lang="scss">
@use "src/styles/variables" as v;

p {
  font-size: 1rem;
  color: v.$danger;
}
</style>
