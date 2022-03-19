<template>
  <div class="workout-result-wrapper">
    <h1>{{ workout.name }}</h1>
    <suspense>
      <workout-result-table :results-to-display="workoutResults"/>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import {WorkoutResult} from "@/model/WorkoutResult";
import WorkoutResultTable from "@/components/WorkoutResultTable.vue";
import {getWorkoutById} from "@/services/workoutService";

const router = useRouter();
const workoutResults = ref<WorkoutResult[]>([])

const workoutId = "24f81170-a767-11ec-8dc4-51488497cd98"
const workout = await getWorkoutById(workoutId)
workoutResults.value = await getResultsByWorkoutId(workoutId)

</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;

.workout-result-wrapper {
  @include m.flex-column-center
}

input {
  padding: 1rem;
  margin: 1rem;
}

input:focus {
  border: dodgerblue;
}

.button {
  padding: 0.5rem;
  color: v.$secondary-color;
  background-color: v.$primary-color;
  border: none;

  &:hover {
    background-color: #336699;
  }
}
h1{
  color: v.$primary-color;
}
</style>
