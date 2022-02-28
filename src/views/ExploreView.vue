<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ExerciseTable from "@/components/ExerciseTable.vue";
import { ref } from "vue";
import { getExerciseById } from "@/services/firebaseService.js"

export default defineComponent({
  components: {
    ExerciseTable,
  },
  async setup() {
    const exercises = ref<any>([]);

    exercises.value = await getExerciseById("0055");
    console.log(exercises);
    return {
      exercises,
    };
  },
});
</script>

<template>
  <div class="wrapper">EXPLORE</div>
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
