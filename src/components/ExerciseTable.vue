<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>Photo</th>
        <th>Exercise ID</th>
        <th>Name</th>
        <th>Target</th>
        <th>Body part</th>
        <th>Equipment</th>
        <!--        <th>Add To Favourite</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="exercise in exercisesToDisplay"
          :key="exercise.id"
          class="tbody-row">
        <td>
          <img
              class="exercise-image"
              :src="exercise.gifUrl"
              alt="exercise gif"
          />
        </td>
        <td>{{ exercise.id }}</td>
        <td class="show-in-mobile-row margin-left">{{ exercise.name }}</td>
        <td class="show-in-mobile-row margin-right dont-show-in-desktop">
          <div class="button button--triangle" @click="showDetails(exercise)">▼</div>
        </td>
        <td>{{ exercise.target }}</td>
        <td> {{ exercise.bodyPart }}</td>
        <td>{{ exercise.equipment }}</td>
      </tr>
      </tbody>
    </table>
    <div class="modal" v-if="isExerciseDetailsVisible">
      <div class="modal__content">
        <img
            class="exercise-image"
            :src="detailedExercise.gifUrl"
            alt="exercise gif"
        />
        <h4>{{ detailedExercise.name.toUpperCase() }}</h4>
        <div class="exercise-info-wrapper">
          <h4 class="exercise-info-wrapper__body-part">body part:</h4>
          <h4 class="exercise-info-wrapper__body-part__value"> {{ detailedExercise.target.toUpperCase() }}
            ({{ detailedExercise.bodyPart.toUpperCase() }})</h4>
          <h4 class="exercise-info-wrapper__equipment">equipment: </h4>
          <h4 class="exercise-info-wrapper__equipment__value">
            {{ detailedExercise.equipment.toUpperCase() }}</h4>
        </div>
        <div class="button button--cancel" @click="closeExerciseDetailsModal">close</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {Exercise} from "@/model/Exercise";
// eslint-disable-next-line no-undef,@typescript-eslint/no-unused-vars
const props = defineProps({
  exercisesToDisplay: {
    type: Array,
    required: true,
  },
  error: {
    type: Error,
  },
})

const isExerciseDetailsVisible = ref(false);
const detailedExercise: Ref<Exercise> = ref({} as Exercise);
const showDetails = (exerciseToShow) => {
  detailedExercise.value = exerciseToShow
  isExerciseDetailsVisible.value = true
}
const closeExerciseDetailsModal = () => {
  isExerciseDetailsVisible.value = false
}
</script>

<style lang="scss" scoped>
@use "../styles/components/table";
@use "../styles/components/modal";
@use "../styles/components/button" as v;

.exercise-info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  &__body-part {
    grid-column: 1;
    grid-row:1;

    &__value {
      grid-column: 2;
      grid-row:1;
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
  width: 10vw;
}

@media screen and (max-width: 590px) {
  .exercise-image {
    width: 70vw;
  }
}
</style>
