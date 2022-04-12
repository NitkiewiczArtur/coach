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

import {computed, ref} from "vue";
import SetResult, {mapToSetResults} from "@/model/SetResult";
import ExerciseSetResultInput from "@/components/ExerciseSetResultInput.vue";
import {useWorkoutResultStore} from "@/composable/useWorkoutResultStore";

const props = defineProps({
  exerciseId: {
    type: String,
    required: true,
  }
})
const {
  commitSetExerciseSetLoad, commitSetExerciseSetReps, commitAddExerciseSet,
  commitRemoveExerciseSet, getExerciseResultByIdGetter
} = useWorkoutResultStore()

const incrementAmount = ref(1)
const exerciseResult = getExerciseResultByIdGetter(props.exerciseId)
const setResults = computed(() => mapToSetResults(exerciseResult))

const addSet = () => {
  const lastSet = setResults.value[setResults.value.length - 1]
  const newSetResult = lastSet
      ? {...lastSet, index: lastSet.index + 1}
      : {load: 0, reps: 0, index: 0} as SetResult
  setResults.value.push(newSetResult);
  const storePayload = {
    exerciseId: props.exerciseId,
    newSetResult: newSetResult,
  }
  commitAddExerciseSet(storePayload);
}

const removeSet = () => {
  setResults.value.pop();
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
@use "../styles/mixins" as m;
.exercise-result-panel {
  @include m.flex-row-center;
  justify-content: flex-end;
  width: v.$content-width -1rem;
  margin-bottom: 1rem;

  button:first-of-type {
    margin-bottom: 0.25rem;
  }
}
span{
  font-weight: bold;
}
</style>
