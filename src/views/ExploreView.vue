<script lang="ts">
import {defineComponent, ref} from "vue";
import ExerciseTable from "@/components/ExerciseTable.vue";
import {getExercises, searchExercises} from "@/services/exerciseService"
import SearchBar from "@/components/SearchBar.vue";

export default defineComponent({
  components: {
    SearchBar,
    ExerciseTable,
  },
  async setup() {
    const exercises = ref<any>([]);

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
<!--  <search-bar search-keys="[Name]"></search-bar>-->
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
  }
}
</style>
