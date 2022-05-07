<template>
  <div class="login-wrapper">
    <form novalidate @submit.prevent="onSubmit">
      <h3>Sign in</h3>
      <error-display :errors="errors"/>
      <email-input v-model:value="email" v-model:isValid="isEmailValid" :showErrors="showInputErrors"/>
      <password-input v-model:value="password" v-model:isValid="isPasswordValid" :showErrors="showInputErrors"/>
      <button class="button" type="submit">Sign in</button>
    </form>
    <div>
      <h4>You dont have an account?</h4>
    </div>
      <button @click="navigateToSignUp" class="button">Sign up</button>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import useCoachRouter from "@/composable/useCoachRouter";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import EmailInput from "@/components/inputs/EmailInput.vue";
import {store} from "@/store"
import ErrorDisplay from "@/components/inputs/ErrorDisplay.vue";

const {navigateToSignUp, navigateToMyWorkouts} = useCoachRouter();
const showInputErrors = ref(false)
const password = ref("");
const email = ref("")
const isEmailValid = ref(false)
const isPasswordValid = ref(false)
const errors = computed(() => store.state.auth.error ? [store.state.auth.error.code] : [])
const onSubmit = async () => {
  if (isEmailValid.value && isPasswordValid.value) {
    await store.dispatch('auth/signIn', {email: email.value, password: password.value})
    await navigateToMyWorkouts()
  } else {
    showInputErrors.value = true
  }
}
</script>
<style scoped lang="scss">
@use "../styles/mixins";
@use "../styles/components/form";

.login-wrapper {
  @include mixins.column-content-wrapper;
}
</style>
