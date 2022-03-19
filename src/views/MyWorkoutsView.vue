<script lang="ts">
import {defineComponent, ref} from "vue";
import {searchExercises} from "@/services/exerciseService"
import {getWorkouts} from "@/services/workoutService"
import SearchBar from "@/components/SearchBar.vue";
import WorkoutList from "@/components/WorkoutList.vue";
import {Workout} from "@/model/Workout";

export default defineComponent({
  components: {
    SearchBar,
    WorkoutList,
  },
  async setup() {
    const workouts = ref<Array<Workout>>([]);

    workouts.value = await getWorkouts();
    console.log(workouts.value)
    const onSearchClicked = async (searchValue: string) => {
    //  workouts.value = await searchExercises(searchValue)
    }
    return {
      workouts,
      onSearchClicked
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <SearchBar @searchClicked="onSearchClicked"/>
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
  height: 90vh;
}

@media screen and (min-width: 700px) {
  .wrapper {
    justify-content: start;
    flex-direction: column;
  }
}
</style>
