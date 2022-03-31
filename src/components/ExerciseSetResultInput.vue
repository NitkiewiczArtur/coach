<template>
  <div class="exercise-set-result-input-wrapper">
    <input v-model="load"
           @focus="setLoadAsTarget"
           class="input input--load" type="number"/>
    X
    <input v-model="reps"
           @focus="setRepsAsTarget"
           class="input input--reps" type="number"/>
    <div class="button-wrapper">
      <button
          @click="increment"
          class="button button--submit button--submit--round">+
      </button>
      <button
          @click="decrement"
          class="button button--cancel button--cancel--round">&#8211;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {SetResult} from "@/model/SetResult";

const props = defineProps({
  setResult: {
    type: Object as PropType<SetResult>,
    required: true,
  },
  incrementAmount:{
    type: Number,
    required: true,
  },
  error: {
    type: Error,
  },
})
let target
const emit = defineEmits(['loadChanged', 'repsChanged'])
const load = ref(props.setResult.load)
const reps = ref(props.setResult.reps)

const setLoadAsTarget = () => {
  target = load
}
const setRepsAsTarget = () => {
  target = reps
}
const increment = () => {
  try {
    target.value += props.incrementAmount
  } catch (e) {
    console.log(e)
  }
}
const decrement = () => {
  target.value -= props.incrementAmount
}
const emitLoadChanged = (newSetResult: SetResult) => {
  emit('loadChanged', newSetResult)
}
const emitRepsChanged = (newSetResult: SetResult) => {
  emit('repsChanged', newSetResult)
}

watch(load, (newLoad) => {
  const newSetResult = {
    index: props.setResult.index,
    load: newLoad
  } as SetResult
  emitLoadChanged(newSetResult)
})

watch(reps, (newReps) => {
  const newSetResult = {
    index: props.setResult.index,
    reps: newReps
  } as SetResult
  emitRepsChanged(newSetResult)
})
</script>

<style lang="scss" scoped>
@use "../styles/mixins";
@use "../styles/components/input";

.exercise-set-result-input-wrapper {
  @include mixins.flex-row-center;
  justify-content: center;
  font-size: 1.5rem;
}

.button-wrapper {
  @include mixins.flex-column-center;

  button:first-of-type {
    margin-bottom: 0.25rem;
  }
}

</style>
