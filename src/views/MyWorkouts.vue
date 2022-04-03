<script lang="ts">
import {defineComponent, ref} from "vue";
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
      workouts,
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <WorkoutList :workouts-to-display="workouts"></WorkoutList>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 87vh;
}

@media screen and (min-width: 700px) {
  .wrapper {
    justify-content: start;
    flex-direction: column;
  }
}
</style>
