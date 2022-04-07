<script setup lang="ts">
import {ref} from "vue";
import {getWorkoutsByUserId} from "@/services/workoutService"
import WorkoutList from "@/components/WorkoutList.vue";
import {currentUser} from "@/services/authService";

const userId = currentUser()?.uid as string
const workouts = ref(await getWorkoutsByUserId(userId));
</script>

<template>
  <div class="my-workouts-wrapper">
    <WorkoutList :workouts-to-display="workouts"></WorkoutList>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

.my-workouts-wrapper {
  @include mixins.reverse-column-content-wrapper
}

@media screen and (min-width: 700px) {
  .my-workouts-wrapper {
   @include mixins.justify-start-column;
  }
}
</style>
