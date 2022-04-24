<template>
  <div class="login-wrapper">
    <form novalidate @submit.prevent="onSubmit">
      <h3>Logging in</h3>
      <email-input v-model:value="email" v-model:isValid="isEmailValid" :showErrors="showErrors"/>
      <password-input v-model:value="password" v-model:isValid="isPasswordValid" :showErrors="showErrors"/>
      <button class="button" type="submit">Log in</button>
    </form>
    <div>
      <h4>You dont have an account?</h4>
    </div>
      <button @click="navigateToSignup" class="button">Sign up</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import useCoachRouter from "@/composable/useCoachRouter";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
import {signIn} from "@/services/authService";
import {store} from "@/store"

const {navigateToSignup, navigateToMyWorkouts} = useCoachRouter();
const showErrors = ref(false)
const password = ref("");
const email = ref("")
const isEmailValid = ref(false)
const isPasswordValid = ref(false)

const onSubmit = () => {
  if (isEmailValid.value && isPasswordValid.value) {
    //firestore doesnt work if store used in authService
    store.commit('loader/START_LOADING')
    signIn(email.value, password.value)
        .then(() => {
          store.commit('loader/FINISH_LOADING')
          navigateToMyWorkouts()
        })
  } else {
    showErrors.value = true
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
