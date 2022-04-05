<template>
  <div class="workout-result-wrapper">
    <h2>{{ workout.name }}</h2>
    <div class="workout-result-wrapper__content-wrapper">
      <suspense>
        <workout-result-table :results-data-list-to-display="exerciseResultDataList"/>
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
import WorkoutResultTable from "@/components/ExerciseResultTable.vue";
import {getWorkoutById} from "@/services/workoutService";
import {useCoachRouter} from "@/composable/useCoachRouter";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {getExerciseResultData} from "@/services/exerciseResultDataService";

const {workoutIdFromRoute, navigateBackward} = useCoachRouter()

const workout = await getWorkoutById(workoutIdFromRoute)
const workoutResults = await getResultsByWorkoutId(workoutIdFromRoute, 30)

const exerciseResultDataPromises: Promise<ExerciseResultData | undefined>[] = []
if(workout){
  workout.exercises.forEach(exerciseId => {
    exerciseResultDataPromises.push(getExerciseResultData(exerciseId, workoutResults))
  })
}
const exerciseResultDataList = await Promise.all(exerciseResultDataPromises)

</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;
@use "../styles/components/button";

.workout-result-wrapper {
  @include m.flex-column-center;
  height:94vh;
  overflow:auto;
  &__content-wrapper {
    @include m.flex-column-center;
  }

  @media screen and (min-width: 700px) {
    height: 90vh;
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
