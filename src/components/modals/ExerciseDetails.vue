<template>
  <div class="modal">
    <div class="modal__content">
      <img
          class="exercise-image"
          :src="detailedExercise.gifUrl"
          alt="exercise gif"
      />
      <h4>{{ detailedExercise.name.toUpperCase() }}</h4>
      <div class="exercise-info-wrapper">
        <p class="exercise-info-wrapper__body-part">body part:</p>
        <p class="exercise-info-wrapper__body-part__value">
          {{ detailedExercise.target.toUpperCase() }}
          ({{ detailedExercise.bodyPart.toUpperCase() }})</p>
        <p class="exercise-info-wrapper__equipment">equipment: </p>
        <p class="exercise-info-wrapper__equipment__value">
          {{ detailedExercise.equipment.toUpperCase() }}</p>
      </div>
      <button class="button button--cancel" @click="closeExerciseDetailsModal">close</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import Exercise from "@/model/Exercise";

const props = defineProps({
  detailedExercise: {
    type: Object as PropType<Exercise>,
    required: true,
  }
});

const emit = defineEmits(['closeExerciseDetailsModalClicked'])
const closeExerciseDetailsModal = () => {
  emit('closeExerciseDetailsModalClicked')
}
</script>

<style lang="scss" scoped>
@use "src/styles/components/modal";
@use "src/styles/components/button" as v;

.exercise-info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  &__body-part {
    grid-column: 1;
    grid-row: 1;

    &__value {
      grid-column: 2;
      grid-row: 1;
      text-align: start;
    }
  }

  &__equipment {
    grid-column: 1;
    grid-row: 2;

    &__value {
      grid-column: 2;
      grid-row: 2;
      text-align: start;
    }
  }
}

.exercise-image {
  border-radius: 25px;
  width: 70vw;
}

@media screen and (min-width: 900px) {
  .exercise-image {
    width: 10vw;
  }
}
</style>
