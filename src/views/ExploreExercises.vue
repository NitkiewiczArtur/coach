<script lang="ts">
import {defineComponent, ref} from "vue";
import ExerciseTable from "@/components/collections/ExerciseTable.vue";
import {getExercises, searchExercises} from "@/services/exerciseService"
import SearchBar from "@/components/common/SearchBar.vue";

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
  padding-top:1rem;
  @include mixins.column-content-wrapper;
  justify-content: flex-start;
  height: 88vh;
}
</style>
