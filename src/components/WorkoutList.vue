<template>
  <div class="list-container">
    WORKOUT LIST
    <div class="list">
      <div v-for="workout in workoutsToDisplay"
           :key="workout.id"
           class="list__item">
        <span>{{ workout.name }}</span>
        <div class="button-group">
          <div class="button button--primary"
               @click="startTraining(workout)">start training
          </div>
          <div class="button button--triangle"
               @click="showDetails(workout)">▼
          </div>
        </div>
      </div>
    </div>
    <workout-details :detailed-exercises="detailedExercises"
                     :detailed-workout="detailedWorkout"
                     :is-workout-details-visible="isWorkoutDetailsVisible"
                     @closeWorkoutDetailsModalClicked="onCloseWorkoutDetailsModalClicked"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {Workout} from "@/model/Workout";
import {getExerciseById, getExercisesByIds} from "@/services/exerciseService"
import {Exercise} from "@/model/Exercise";
import WorkoutDetails from "@/components/modals/WorkoutDetails.vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  workoutsToDisplay: {
    type: Array,
    required: true,
  },
  error: {
    type: Error,
  },
})

const isWorkoutDetailsVisible = ref(false);
const detailedWorkout: Ref<Workout> = ref({} as Workout);
const detailedExercises: Ref<Array<Exercise | undefined>> = ref([]);
const startTraining = (workout: Workout) => {
  console.log("TRAINING START")
}

const showDetails = async (workoutToShow: Workout) => {
  detailedWorkout.value = workoutToShow
  const exercises = await getExercisesByIds(workoutToShow.exercises)
  detailedExercises.value = [...exercises]
  isWorkoutDetailsVisible.value = true
}
const onCloseWorkoutDetailsModalClicked = () => {
  isWorkoutDetailsVisible.value = false
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

    span {
      margin-left: 2rem;
    }

    .button {
      margin-right: 1rem;
    }
  }
}
</style>
