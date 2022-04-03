<template>
  <div class="list-container">
    <div class="list">
      <div v-for="(workout, index) in workoutsToDisplay"
           :key="index">
        <div class="list__item">
          <span>{{ workout.name }}</span>
          <div class="button-group">
            <button class="button button--primary"
                    @click="showResults(workout.id)">results
            </button>
            <button class="button button--submit"
                    @click="startTraining(workout.id)">start
            </button>
            <button class="button button--triangle"
                    @click="toggleShowExercises(index)">{{ isWorkoutExercisesHidden[index] ? '▼' : '▲' }}
            </button>
          </div>
        </div>
        <exercise-table v-if="workoutsExercises.length" v-show="!isWorkoutExercisesHidden[index]"
                        :exercises-to-display="workoutsExercises[index]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, reactive, Ref, ref} from "vue";
import {Workout} from "@/model/Workout";
import {getWorkoutsExercises} from "@/services/exerciseService"
import ExerciseTable from "@/components/ExerciseTable.vue";
import {useCoachRouter} from "@/composable/useCoachRouter";
import {Exercise} from "@/model/Exercise";

const props = defineProps({
  workoutsToDisplay: {
    type: Array as PropType<Workout[]>,
    required: true,
  },
  error: {
    type: Error,
  },
})

const {navigateToWorkoutResults, navigateToDoWorkout} = useCoachRouter()
const mapWorkoutsToIsHiddenExercises = (workouts: Workout[]) => {
  return workouts.map(workout => true)
}

const isWorkoutExercisesHidden = reactive(mapWorkoutsToIsHiddenExercises(props.workoutsToDisplay))
//TODO: Test utils doesnt work for setup with async await
const workoutsExercises:Ref<(Exercise | undefined)[][]> = ref([])
getWorkoutsExercises(props.workoutsToDisplay)
    .then(workoutsExercisesResponse => {
      workoutsExercises.value = workoutsExercisesResponse
    })

const startTraining = (workoutId: string) => {
  navigateToDoWorkout(workoutId)
}
const showResults = (workoutId: string) => {
  navigateToWorkoutResults(workoutId)
}
const toggleShowExercises = (workoutIndex: number) => {
  isWorkoutExercisesHidden[workoutIndex] = !isWorkoutExercisesHidden[workoutIndex]
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as v;
@use "../styles/components/modal";
@use "../styles/components/button";

.list {
  color: black;
  min-width: 20vw;

  &__item {
    display: inline-flex;
    height: 4rem;
    background-color: v.$third-color;
    border-bottom: v.$background solid 3px;
    width: 93vw;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    font-weight: bold;

    span {
      margin-left: 2rem;
    }

    .button {
      margin-right: 1rem;
    }
  }
}
@media screen and (min-width: 700px) {
  .list-container {
    margin-top: 1rem;
  }
}
</style>
