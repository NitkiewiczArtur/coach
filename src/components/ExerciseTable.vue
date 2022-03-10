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
    <exercise-details :is-exercise-details-visible="isExerciseDetailsVisible"
                      :detailed-exercise="detailedExercise"
                      @closeExerciseDetailsModalClicked="onCloseExerciseDetailsModalClicked"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {Exercise} from "@/model/Exercise";
import ExerciseDetails from "@/components/modals/ExerciseDetails.vue";
// eslint-disable-next-line no-undef
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
const onCloseExerciseDetailsModalClicked = () => {
  isExerciseDetailsVisible.value = false;
}
</script>

<style lang="scss" scoped>
@use "../styles/components/table";
@use "../styles/components/button" as v;
.exercise-image {
  border-radius: 25px;
  width: 10vw;
}
</style>
