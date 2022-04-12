<template>
  <div class="do-exercise-wrapper">
    <h2>{{ workout.name }}</h2>
    <div class="do-exercise-wrapper__content-wrapper">
      <!--      <form novalidate @submit.prevent="onSubmit">-->
      <div class="align-right">
        <button class="button button--primary"
                @click="navigateBackward">Go back
        </button>
      </div>
      <suspense>
        <do-exercise-table :results-data-list-to-display="exerciseResultDataList"/>
      </suspense>
      <div class="align-right">
        <div class="time-of-workout-input-wrapper ">
          <span>Time of workout:</span><input v-model="timeOfWorkout"
                                              class="input input--time" type="number"/>
        </div>
      </div>
      <p v-show="showInvalidFormCommunicate">
        Form invalid! Correct displayed incompatibility and press finish again.</p>
      <div class="align-right">
        <button @click="onSubmit"
                type="submit"
                class="button button--submit">FINISH WORKOUT
        </button>
      </div>
      <!--      </form>-->
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
import {isValidWorkoutResult} from "@/utils/workoutResultValidator";

const {
  dispatchInitNewWorkoutResult, dispatchFinishWorkout,
  commitSetWorkoutTime, getNewWorkoutResultsTimeOfWorkout,
  getNewWorkoutResultFromStore
} = useWorkoutResultStore()

const {workoutIdFromRoute, navigateBackward} = useCoachRouter()
const showInvalidFormCommunicate = ref(false)

const onSubmit = () => {
  if (isValidWorkoutResult(getNewWorkoutResultFromStore())) {
    return dispatchFinishWorkout()
  }
  showInvalidFormCommunicate.value = true
}

const workout = await getWorkoutById(workoutIdFromRoute)

const exerciseResultDataPromises = []
const workoutResults = await getResultsByWorkoutId(workoutIdFromRoute, 5)

workout?.exercises.forEach(exerciseId => {
  exerciseResultDataPromises.push(getExerciseResultData(exerciseId, workoutResults))
})

const exerciseResultDataList = ref(await Promise.all(exerciseResultDataPromises))

await dispatchInitNewWorkoutResult()
const timeOfWorkout = ref(getNewWorkoutResultsTimeOfWorkout())

watch(timeOfWorkout, (newTimeOfWorkout) => {
  commitSetWorkoutTime(newTimeOfWorkout)
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
  margin-right: 0.25rem;
}

.align-right {
  @include m.flex-row-end;
  width: 100%;
  margin: 0 0 1rem 0;
}

</style>
