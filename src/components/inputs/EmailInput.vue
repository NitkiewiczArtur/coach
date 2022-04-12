<template>
  <div>
    <input v-model="input" type="email" placeholder="email"/>
    <template v-if="showErrors">
      <error-display :errors="errors"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import useInputValidator from "@/composable/useInputValidator";
import {isEmail} from "@/utils/validators";
import ErrorDisplay from "@/components/inputs/ErrorDisplay.vue";

const props = defineProps({
  value: {
    type: String,
  },
  isValid: {
    type: Boolean,
    default: false
  },
  showErrors: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(['update:value', 'update:isValid'])
const validate = (value: string) => {
  emit('update:value', value)
  if (!errors.value.length || errors.value.every(error => !error)) {
    emit('update:isValid', true)
  } else {
    emit('update:isValid', false)
  }
}
const {input, errors} = useInputValidator(
    props.value,
    [isEmail],
    validate
)
</script>

<style lang="scss" scoped>
@use "src/styles/components/form";
</style>
