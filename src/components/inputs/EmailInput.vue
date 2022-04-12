<template>
  <div>
    <input type="email" v-model="input" placeholder="email"/>
    <template v-if="showErrors">
      <p v-for="error in errors" :key="error">
        {{ error }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import useInputValidator from "@/composable/useInputValidator";
import {isEmail} from "@/utils/validators";

export default {
  name: "EmailInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false
    },
    showErrors: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
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
    );
    return {
      input,
      errors
    }
  }
}
</script>

<style lang="scss" scoped>
@use "src/styles/components/form";
</style>
