<template>
  <div class="table-wrapper">
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
        <td class="margin-left-on-mobile">{{ exercise.name }}</td>
        <td class="margin-right-on-mobile">
          <button class="button button--triangle" @click="showDetails(exercise)">▼</button>
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
.table-wrapper{
  font-weight: bold;
}
.exercise-image {
  border-radius: 25px;
  width: 10vw;
}

@media screen and (max-width:700px){
  tbody tr td:nth-child(1) { display : none}
  tbody tr td:nth-child(2) { display : none}
  tbody tr td:nth-child(5) { display : none}
  tbody tr td:nth-child(6) { display : none}
  tbody tr td:nth-child(7) { display : none}
}

@media screen and (min-width:700px) {
  tbody tr td:nth-child(4) { display : none}
}
</style>
