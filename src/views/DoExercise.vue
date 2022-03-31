<template>
  <div class="do-exercise-wrapper">
    <h2>{{ workout.name }}</h2>
    <div class="do-exercise-wrapper__content-wrapper">
      <suspense>
        <do-exercise-table :workout="workout" :results-to-display="workoutResults"/>
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
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import DoExerciseTable from "@/components/DoExerciseTable.vue";
import {getWorkoutById} from "@/services/workoutService";
import {useCoachRouter} from "@/composable/useRouter";

const {workoutIdFromRoute, navigateBackward} = useCoachRouter()

const workoutResults =  await getResultsByWorkoutId(workoutIdFromRoute, 5)
const workout = await getWorkoutById(workoutIdFromRoute)

</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;
@use "../styles/components/button";

.do-exercise-wrapper {
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
