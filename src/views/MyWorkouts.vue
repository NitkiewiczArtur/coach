<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from "vue";
import {getWorkoutsByUserId} from "@/services/workoutService"
import WorkoutList from "@/components/WorkoutList.vue";
import {Workout} from "@/model/Workout";
import {currentUser} from "@/services/authService";

export default defineComponent({
  components: {
    WorkoutList,
  },
  async setup() {
    const workouts = ref<Array<Workout>>([]);
    const userId = currentUser()?.uid as string

    if(userId){
      workouts.value = await getWorkoutsByUserId(userId);
    }

    return {
      workouts
    };
  },
});
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
