<template>
  <div class="workout-result-wrapper">
    <h1>{{ workout.name }}</h1>
    <div class="workout-result-wrapper__content-wrapper">
      <suspense>
        <workout-result-table :results-to-display="workoutResults"/>
      </suspense>
      <div class="button-wrapper">
        <button class="button button--primary"
                @click="navigateBackward">Go back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import {WorkoutResult} from "@/model/WorkoutResult";
import WorkoutResultTable from "@/components/WorkoutResultTable.vue";
import {getWorkoutById} from "@/services/workoutService";
import {useCoachRouter} from "@/composable/useRouter";

const {workoutIdFromRoute, navigateBackward} = useCoachRouter()

const workoutResults = ref<WorkoutResult[]>([])
const workout = await getWorkoutById(workoutIdFromRoute)
workoutResults.value = await getResultsByWorkoutId(workoutIdFromRoute, 30)

</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;
@use "../styles/components/button";

.workout-result-wrapper {
  @include m.flex-column-center;

  &__content-wrapper {
    @include m.flex-column-center;
  }

  @media screen and (min-width: 700px) {
    &__content-wrapper {
      @include m.flex-column-reverse-center;
    }
  }
}

.button-wrapper {
  width: 100%;
  margin: 1rem 2rem 1rem 0;
  display: flex;
  flex-direction: row-reverse;
}
</style>
