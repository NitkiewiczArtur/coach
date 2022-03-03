<script lang="ts">
import {defineComponent, ref} from "vue";
import ExerciseTable from "@/components/ExerciseTable.vue";
import {searchExercises} from "@/services/exerciseService"

export default defineComponent({
  components: {
    ExerciseTable,
  },
  async setup() {
    const exercises = ref<any>([]);

    exercises.value = await searchExercises();
    console.log(exercises);
    return {
      exercises,
    };
  },
});
</script>

<template>
  <div class="wrapper">EXPLORE</div>
<!--  <search-bar search-keys="[Name]"></search-bar>-->
  <suspense>
    <ExerciseTable :exercises-to-display="exercises"></ExerciseTable>
  </suspense>
</template>
<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
