<template>
  <div class="workout-result-wrapper">
    <h1>{{ workout.name }}</h1>
    <suspense>
      <workout-result-table :results-to-display="workoutResults"/>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import {WorkoutResult} from "@/model/WorkoutResult";
import WorkoutResultTable from "@/components/WorkoutResultTable.vue";
import {getWorkoutById} from "@/services/workoutService";

const route = useRoute();
const workoutResults = ref<WorkoutResult[]>([])

const workoutId = route.params.workoutId as string
const workout = await getWorkoutById(workoutId)
workoutResults.value = await getResultsByWorkoutId(workoutId)
</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;

.workout-result-wrapper {
  @include m.flex-column-center
}
</style>
