<template>
  <div class="do-exercise-wrapper">
    <h2>{{ workout.name }}</h2>
    <div class="do-exercise-wrapper__content-wrapper">
      <div class="component-container">
        <button class="button button--primary"
                @click="navigateBackward">Go back
        </button>
      </div>
      <suspense>
        <do-exercise-table :results-data-list-to-display="exerciseResultDataList"/>
      </suspense>
      <div class="component-container">
        <div class="time-of-workout-input-wrapper ">
          <span>Time of workout:</span><input v-model="timeOfWorkout"
                                              class="input input--time" type="number"/>
        </div>
      </div>
      <div class="component-container">
        <button @click="finishWorkout"
                class="button button--submit">FINISH WORKOUT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import DoExerciseTable from "@/components/DoExerciseTable.vue";
import {getWorkoutById} from "@/services/workoutService";
import {useCoachRouter} from "@/composable/useCoachRouter";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {getExerciseResultData} from "@/services/exerciseResultDataService";
import {useWorkoutResultStore} from "@/composable/useWorkoutResultStore";
import {ref, watch} from "vue";

const {initNewWorkoutResult, finishWorkout, setWorkoutTime} = useWorkoutResultStore()
const {workoutIdFromRoute, navigateBackward} = useCoachRouter()

const exerciseResultDataPromises: Promise<ExerciseResultData | undefined>[] = []
const workoutResults = await getResultsByWorkoutId(workoutIdFromRoute, 5)
const workout = await getWorkoutById(workoutIdFromRoute)

workout?.exercises.forEach(exerciseId => {
  exerciseResultDataPromises.push(getExerciseResultData(exerciseId, workoutResults))
})

const exerciseResultDataList = ref(await Promise.all(exerciseResultDataPromises))
const newWorkoutResultSnapshot = await initNewWorkoutResult()
const timeOfWorkout = ref(newWorkoutResultSnapshot.timeOfWorkout)

watch(timeOfWorkout, (newTimeOfWorkout) => {
  setWorkoutTime(newTimeOfWorkout)
})

</script>
<style scoped lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;
@use "../styles/components/button";
@use "../styles/components/input";

.do-exercise-wrapper {
  @include m.flex-column-center;
  overflow:auto;
  height: 94vh;
  &__content-wrapper {
    @include m.flex-column-center;
  }
  @media screen and (min-width: 700px) {
    height: 87vh;
  }
}

.time-of-workout-input-wrapper {
  background-color: v.$third-color;
  border-radius: 10px;
  padding: 0 1rem 0 1rem;
  font-size: 1.2rem;
}

.component-container {
  @include m.flex-row-end;
  width: 100%;
  margin: 0 0 1rem 0;
}

</style>
