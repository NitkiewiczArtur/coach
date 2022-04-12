<script lang="ts">
import {defineComponent, ref} from "vue";
import ExerciseTable from "@/components/ExerciseTable.vue";
import {getExercises, searchExercises} from "@/services/exerciseService"
import SearchBar from "@/components/SearchBar.vue";
import Exercise from "@/model/Exercise";

export default defineComponent({
  components: {
    SearchBar,
    ExerciseTable,
  },
  async setup() {
    const exercises = ref(await getExercises());

    const onSearchClicked = async (searchValue: string) =>{
      exercises.value = await searchExercises(searchValue)
    }
    return {
      exercises,
      onSearchClicked
    };
  },
});
</script>

<template>
  <div class="explore-exercise-wrapper">
  <SearchBar @searchClicked="onSearchClicked"/>
  <suspense>
      <ExerciseTable :exercises-to-display="exercises"/>
  </suspense>
  </div>
</template>
<style lang="scss">
@use "../styles/mixins";

.explore-exercise-wrapper {
  @include mixins.reverse-column-content-wrapper
}

@media screen and (min-width: 700px) {
  .explore-exercise-wrapper{
    @include mixins.justify-start-column;
  }
}
</style>
