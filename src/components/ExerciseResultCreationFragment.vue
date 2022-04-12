<template>
  <div class="exercise-result-creation-wrapper">
    <div v-for="setResult in setResults" :key="setResult.index">
      <exercise-set-result-input :set-result="setResult"
                                 :increment-amount="incrementAmount"
                                 @loadChanged="onLoadChanged"
                                 @repsChanged="onRepsChanged"/>
    </div>
    <div class="exercise-result-panel">
          <span>
            INCR BY:
          </span>
      <input v-model="incrementAmount" class="input input--increment" type="number"/>
      <div>
        <button @click="addSet"
                class="button button--submit">ADD SET
        </button>
        <button @click="removeSet"
                class="button button--cancel">REM SET
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, reactive, ref} from "vue";
import {mapToSetResults, SetResult} from "@/model/SetResult";
import ExerciseSetResultInput from "@/components/ExerciseSetResultInput.vue";
import {useWorkoutResultStore} from "@/composable/useWorkoutResultStore";

const props = defineProps({
  exerciseId: {
    type: String,
    required: true,
  },
  error: {
    type: Error,
  },
})
const {
  commitSetExerciseSetLoad, commitSetExerciseSetReps, commitAddExerciseSet,
  commitRemoveExerciseSet, getExerciseResultById
} = useWorkoutResultStore()

const incrementAmount = ref(1)
const exerciseResult = getExerciseResultById(props.exerciseId)

const setResults = reactive(mapToSetResults(exerciseResult))

const lastSetResult = computed(() => {
  return setResults[setResults.length - 1]
})
const errors = ref([])
const addSet = () => {
  setResults.push(lastSetResult.value);
  const storePayload = {
    exerciseId: props.exerciseId,
    newSetResult: lastSetResult.value,
  }
  commitAddExerciseSet(storePayload);
}
const removeSet = () => {
  setResults.pop();
  commitRemoveExerciseSet(props.exerciseId);
}

const onLoadChanged = (newSetResult: SetResult) => {
  const storePayload = {
    newSetResult,
    exerciseId: props.exerciseId
  }
  commitSetExerciseSetLoad(storePayload);
}
const onRepsChanged = (newSetResult: SetResult) => {
  const storePayload = {
    newSetResult,
    exerciseId: props.exerciseId
  }
  commitSetExerciseSetReps(storePayload);
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as v;
@use "../styles/components/input";

.exercise-result-panel {
  width: v.$content-width -1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button:first-of-type {
    margin-bottom: 0.25rem;
  }
}
span{
  font-weight: bold;
}
</style>
