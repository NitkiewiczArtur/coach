<template>
  <div class="modal">
    <div class="modal__content">
      <h2>{{ detailedWorkout.name }}</h2>
      <exercise-table :exercises-to-display="detailedExercises"/>
      <button class="button button--cancel"
           @click="closeWorkoutDetailsModal">
        close
      </button>
    </div>
</div>
</template>

<script setup lang="ts">
import ExerciseTable from "@/components/collections/ExerciseTable.vue";
import Workout from "@/model/Workout";
import {PropType} from "vue";
import Exercise from "@/model/Exercise";

const props = defineProps({
  detailedWorkout: {
    type: Object as PropType<Workout>,
    required: true,
  },
  detailedExercises: {
    type: Array as PropType<Exercise[]>,
    required: true,
  },
});

const emit = defineEmits(['closeWorkoutDetailsModalClicked'])
const closeWorkoutDetailsModal = () => {
  emit('closeWorkoutDetailsModalClicked')
}
</script>

<style lang="scss" scoped>
@use "../../styles/components/modal";
@use "../../styles/components/button";
@use "../../styles/variables" as v;

.exercise-item {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 75vw;
}
.modal__content{
  background-color: v.$background;
}
</style>
