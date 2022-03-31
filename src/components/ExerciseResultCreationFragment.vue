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
      <input v-model="incrementAmount" class="input input--load" type="number"/>
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

import {computed, PropType, ref} from "vue";
import {ExerciseResult} from "@/model/ExerciseResult";
import {SetResult} from "@/model/SetResult";
import ExerciseSetResultInput from "@/components/ExerciseSetResultInput.vue";
import {useWorkoutResultStore} from "@/composable/useWorkoutResultStore";

const props = defineProps({
  lastExerciseResult: {
    type: Object as PropType<ExerciseResult>,
    required: true,
  },
  error: {
    type: Error,
  },
})
const {
  setExerciseSetLoad, setExerciseSetReps, addExerciseSet,
  removeExerciseSet, getSetResults
} = useWorkoutResultStore()
const exerciseId = ref(props.lastExerciseResult.exerciseId)
const incrementAmount = ref(1)
const setResults = ref(getSetResults(props.lastExerciseResult))
const lastSetResult = computed(() => {
  return setResults.value[setResults.value.length - 1]
})

const addSet = () => {
  setResults.value.push(lastSetResult.value);
  const payload = {
    exerciseId: exerciseId.value,
    newSetResult: lastSetResult.value,
  }
  addExerciseSet(payload);
}
const removeSet = () => {
  setResults.value.pop();
  removeExerciseSet(exerciseId.value);
}

const onLoadChanged = (newSetResult: SetResult) => {
  const payload = {
    newSetResult,
    exerciseId: exerciseId.value
  }
  setExerciseSetLoad(payload);
}
const onRepsChanged = (newSetResult: SetResult) => {
  const payload = {
    newSetResult,
    exerciseId: exerciseId.value
  }
  setExerciseSetReps(payload);
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
