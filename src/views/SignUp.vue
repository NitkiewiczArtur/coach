<template>
  <div class="register-wrapper">
    <form novalidate @submit.prevent="onSubmit">
      <h3>Sign up</h3>
      <error-display :errors="errors"/>
      <email-input v-model:value="email" v-model:isValid="isEmailValid" :showErrors="showInputErrors"/>
      <password-input v-model:value="password" v-model:isValid="isPasswordValid" :showErrors="showInputErrors"/>
      <button class="button" type="submit">Register</button>
    </form>
    <div>
      <h4>You already have an account?</h4>
    </div>
      <button @click="navigateToSignIn" class="button">Sign in</button>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, unref} from "vue";
import useCoachRouter from "@/composable/useCoachRouter";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import EmailInput from "@/components/inputs/EmailInput.vue";
import {store} from "@/store"
import ErrorDisplay from "@/components/inputs/ErrorDisplay.vue";

const {navigateToSignIn, navigateToMyWorkouts} = useCoachRouter();
const showInputErrors = ref(false)
const password = ref("");
const email = ref("")
const isEmailValid = ref(false)
const isPasswordValid = ref(false)
const errors = computed(() => store.state.auth.error ? [store.state.auth.error.code] : [])
const onSubmit = async () => {
  if (isEmailValid.value && isPasswordValid.value) {
    await store.dispatch('auth/signUp', {email: unref(email), password: unref(password)})
    await navigateToMyWorkouts()
  } else {
    showInputErrors.value = true
  }
}
</script>
<style scoped lang="scss">
@use "../styles/mixins";
@use "../styles/components/form";
@use "../styles/components/button";

.register-wrapper {
  @include mixins.column-content-wrapper;
}
</style>
