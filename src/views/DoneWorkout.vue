<template>
  <div class="done-workout-wrapper">
    <h1>Workout done!</h1>
    <h2>GOOD JOB!</h2>
    <div class="button-group">
      <button class="button" @click="navigateHome">Lets go back home</button>
      <button class="button button--purple" @click="navigateToWorkoutResults(workoutIdFromRoute)">See results</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCoachRouter from "@/composable/useCoachRouter";

const {navigateHome, navigateToWorkoutResults, workoutIdFromRoute} = useCoachRouter()
</script>
<style scoped lang="scss">
@use "../styles/mixins" as m;
@use "../styles/variables" as v;
@use "../styles/components/button";

.done-workout-wrapper {
  @include m.flex-column-center;
  justify-content: center;
  height:100%;
}
h1{
  font-size:4.5rem;
}
h2{
  font-size:4rem;
  color: v.$info;
}
@media screen and (max-width: 700px) {
  .content{
   height: 100%;
  }
}
.button-group{
  width: 18rem;
  justify-content:space-between;
}
</style>
