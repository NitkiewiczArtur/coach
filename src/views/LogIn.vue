<template>
  <div class="login-wrapper">
    <form novalidate @submit.prevent="onSubmit">
      <h3>Logging in</h3>
      <!--      <template v-for="error in errors" :key="error">
              <div class="error">{{ error }}</div>
            </template>
            <div>
              <div v-if="errors.length">
                <p v-for="emailError in errors" :key="emailError">{{ emailError }}</p>
              </div>
              <input class="input" type="email" v-model="email" placeholder="email"/>
            </div>
            <div>
              <input class="input" type="password" v-model="password" placeholder="password"/>
            </div>-->
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
import {useCoachRouter} from "@/composable/useCoachRouter";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
import {signIn} from "@/services/authService";

const {navigateToSignup, navigateToMyWorkouts} = useCoachRouter();
const showErrors = ref(false)
const password = ref("");
const email = ref("")
const isEmailValid = ref(false)
const isPasswordValid = ref(false)

const onSubmit = () => {
  if (isEmailValid.value && isPasswordValid.value) {
    signIn(email.value, password.value)
        .then(() => {
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
