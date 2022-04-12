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
      <template v-for="error in errors" :key="error">
        <p v-if="error">
          {{ error }}
        </p>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import {isNoNegativeNumber} from "@/utils/validators";
import useInputValidator from "@/composable/useInputValidator";
import {computed} from "vue";

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
@use "src/styles/variables" as v;
p{
  font-size:1rem;
  color: v.$danger;
}
</style>
