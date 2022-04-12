<template>
  <div>
    <input
        v-model="input"
        name="load"
        placeholder="load"
        type="number"
        class="input input--load"
        @focus="emitSetLoadAsTarget"/>
    <template v-if="showErrors">
      <error-display :errors="errors"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import {isNoNegativeNumber} from "@/utils/validators";
import useInputValidator from "@/composable/useInputValidator";
import {computed} from "vue";
import ErrorDisplay from "@/components/inputs/ErrorDisplay.vue";

const props = defineProps({
  value: {
    type: Number,
  },
  showErrors: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(['update:value', 'setLoadAsTarget'])

const reactiveValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  }
})
const validate = (value) => {
  emit("update:value", value)
}
const {input, errors} = useInputValidator(
    reactiveValue,
    [isNoNegativeNumber],
    validate
)

const emitSetLoadAsTarget = () => emit('setLoadAsTarget')
</script>

<style lang="scss" scoped>
@use "src/styles/components/input";
</style>
