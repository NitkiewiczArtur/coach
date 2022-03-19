<script lang="ts">
import {defineComponent, ref} from "vue";
import ExerciseTable from "@/components/ExerciseTable.vue";
import {getExercises, searchExercises} from "@/services/exerciseService"
import SearchBar from "@/components/SearchBar.vue";
import {Exercise} from "@/model/Exercise";

export default defineComponent({
  components: {
    SearchBar,
    ExerciseTable,
  },
  async setup() {
    const exercises = ref<Array<Exercise>>([]);

    exercises.value = await getExercises();
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
  <div class="wrapper">
  <SearchBar @searchClicked="onSearchClicked"/>
  <suspense>
    <ExerciseTable :exercises-to-display="exercises"/>
  </suspense>
  </div>
</template>
<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 95vh;
}

@media screen and (min-width: 700px) {
  .wrapper{
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
