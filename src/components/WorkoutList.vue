<template>
  <div class="list-container">
    <div class="list">
      <div v-for="workout in workoutsToDisplay"
           :key="workout.id"
           class="list__item">
        <span>{{ workout.name }}</span>
        <div class="button-group">
          <button class="button button--primary"
                  @click="showResults(workout)">results
          </button>
          <button class="button button--submit"
                  @click="startTraining(workout)">start
          </button>
          <button class="button button--triangle"
                  @click="showDetails(workout)">▼
          </button>
        </div>
      </div>
    </div>
    <div v-if="isWorkoutDetailsVisible">
      <workout-details :detailed-exercises="detailedExercises"
                       :detailed-workout="detailedWorkout"
                       @closeWorkoutDetailsModalClicked="onCloseWorkoutDetailsModalClicked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {Workout} from "@/model/Workout";
import {getExercisesByIds} from "@/services/exerciseService"
import WorkoutDetails from "@/components/modals/WorkoutDetails.vue";
import {Exercise} from "@/model/Exercise";
import {useRouter} from "vue-router";

const props = defineProps({
  workoutsToDisplay: {
    type: Array,
    required: true,
  },
  error: {
    type: Error,
  },
})

const router = useRouter();
const isWorkoutDetailsVisible = ref(false);
const detailedWorkout: Ref<Workout> = ref({} as Workout);
const detailedExercises:Ref<Array<Exercise>> = ref([]);

const startTraining = (workout: Workout) => {
  console.log("TRAINING START")
}
const showResults = (workout: Workout) => {
  router.push({path:"/workoutResults", params:{ workoutId: workout.id}})
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
