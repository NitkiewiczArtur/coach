<template>
  <div class="do-exercise-wrapper">
    <h2>{{ workout.name }}</h2>
    <div class="do-exercise-wrapper__content-wrapper">
      <div class="align-right">
        <button class="button button--primary"
                @click="navigateBackward">Go back
        </button>
      </div>
      <suspense>
        <do-exercise-table :results-data-list-to-display="exerciseResultDataList"/>
      </suspense>
      <div class="align-right">
        <div class="input-wrapper input-wrapper--time-of-workout">
          <span>Time of workout:</span><input v-model="timeOfWorkout"
                                              class="input input--time" type="number"/>
        </div>
      </div>
      <div class="align-right">
        <div class="input-wrapper input-wrapper--day-of-workout">
          <span>Day of workout:</span><input v-model="dayOfWorkout"
                                             class="input" type="date"/>
        </div>
      </div>
      <div class="align-right">
        <ErrorDisplay v-if="showInvalidFormCommunicate" :errors="FORM_ERROR"/>
      </div>
      <div class="align-right">
        <button @click="onSubmit"
                type="submit"
                class="button button--submit">FINISH WORKOUT
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {getResultsByWorkoutId} from "@/services/workoutResultService";
import ExerciseResultData from "@/model/ExerciseResultData";
import {getWorkoutById} from "@/services/workoutService";
import useCoachRouter from "@/composable/useCoachRouter";
import {getExerciseResultData} from "@/services/exerciseResultDataService";
import useWorkoutResultStore from "@/composable/useWorkoutResultStore";
import {defineComponent, ref, watch} from "vue";
import {isValidWorkoutResult} from "@/utils/workoutResultValidator";
import DoExerciseTable from "@/components/collections/DoExerciseTable.vue";
import {store} from "@/store"
import ErrorDisplay from "@/components/inputs/ErrorDisplay.vue";

export default defineComponent({
  components: {ErrorDisplay, DoExerciseTable},
  async beforeRouteEnter(to) {
    await store.dispatch('workoutResult/initNewWorkoutResult', to.params.workoutId)
  },
  async setup() {
    const {
      dispatchFinishWorkout, dayOfWorkoutState,
      dispatchSetWorkoutTime, timeOfWorkoutState,
      newWorkoutResultState, dispatchSetDayOfWorkout
    } = useWorkoutResultStore()
    const FORM_ERROR = ['Form invalid! Correct displayed incompatibility and press finish again.']
    const {workoutIdFromRoute, navigateBackward, navigateToDoneWorkout} = useCoachRouter()
    const showInvalidFormCommunicate = ref(false)

    const onSubmit = async () => {
      if (isValidWorkoutResult(newWorkoutResultState)) {
        await dispatchFinishWorkout()
        return navigateToDoneWorkout(workoutIdFromRoute)
      }
      showInvalidFormCommunicate.value = true
    }
    const timeOfWorkout = ref(timeOfWorkoutState)
    const dayOfWorkout = ref(dayOfWorkoutState)

    watch(dayOfWorkout, (newDayOfWorkout) => {
      dispatchSetDayOfWorkout(new Date(newDayOfWorkout))
    })
    watch(timeOfWorkout, (newTimeOfWorkout) => {
      dispatchSetWorkoutTime(newTimeOfWorkout)
    })

    const workout = await getWorkoutById(workoutIdFromRoute)
    const workoutResults = await getResultsByWorkoutId(workoutIdFromRoute, 5)

    const exerciseResultDataPromises: Promise<ExerciseResultData | undefined> [] = []

    workout?.exercises.forEach(exerciseId => {
      exerciseResultDataPromises.push(getExerciseResultData(exerciseId, workoutResults))
    })
    const exerciseResultDataList = ref(await Promise.all(exerciseResultDataPromises))

    return {
      FORM_ERROR,
      exerciseResultDataList,
      workout,
      timeOfWorkout,
      dayOfWorkout,
      showInvalidFormCommunicate,
      onSubmit,
      navigateBackward,
    }
  }
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

.input-wrapper {
  background-color: v.$third-color;
  border-radius: 10px;
  padding: 0 1rem 0 1rem;
  font-size: 1.2rem;
  margin-right: 0.25rem;
  &--time-of-workout{
    max-width: 50vw;
    margin-top: 0.5rem;
 }
  &--day-of-workout{
    max-width:80vw;
  }
}

.align-right {
  @include m.flex-row-end;
  width: 100%;
  margin-bottom: 0.5rem;
}

</style>
