<template>
  <div class="exercise-input-wrapper">
  <input/>
  </div>
</template>

<script setup lang="ts">

import {PropType, ref} from "vue";
import {ExerciseResult} from "@/model/ExerciseResult";

const props = defineProps({
  lastExerciseResult: {
    type: Object as PropType<ExerciseResult>,
    required: true,
  },
  error: {
    type: Error,
  },
})
const exerciseLoadInputs = ref([...props.lastExerciseResult.load])
</script>

<style lang="scss" scoped>
</style>
