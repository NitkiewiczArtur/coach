<template>
  <div class="modal" v-if="isWorkoutDetailsVisible">
    <div class="modal__content">
      <h2>{{ detailedWorkout.name }}:</h2>
      <exercise-table :exercises-to-display="detailedExercises"/>
      <div class="button button--cancel"
           @click="closeWorkoutDetailsModal">
        close
      </div>
    </div>
</div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {Exercise} from "@/model/Exercise";
import ExerciseTable from "@/components/ExerciseTable.vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  isWorkoutDetailsVisible: {
    type: Boolean,
    required: true,
  },
  detailedWorkout: {
    type: Object,
    required: true,
  },
  detailedExercises: {
    type: Array,
    required: true,
  },
});
const detailedExercise: Ref<Exercise> = ref({} as Exercise)
const isExerciseDetailsVisible = ref(false)
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeWorkoutDetailsModalClicked'])
const closeWorkoutDetailsModal = () => {
  emit('closeWorkoutDetailsModalClicked')
}
const showExerciseDetails = (exerciseToShow) => {
  detailedExercise.value = exerciseToShow
  isExerciseDetailsVisible.value = true
}
const onCloseExerciseDetailsModalClicked = () => {
  isExerciseDetailsVisible.value = false
}
</script>

<style lang="scss" scoped>
@use "src/styles/components/modal";
@use "src/styles/components/button";
@use "src/styles/variables" as v;

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