<template>
  <div class="login-wrapper">
    <form>
      <h3>Logging in</h3>
      <template v-for="error in errors" :key="error">
        <div class="error">{{ error }}</div>
      </template>
      <div>
        <input class="input" type="email" v-model="email" placeholder="email"/>
      </div>
      <div>
        <input class="input" type="password" v-model="password" placeholder="password"/>
      </div>
      <button class="button" type="submit" @click="submitForm">Log in</button>
    </form>
    <div>
      <h4>You dont have an account?</h4>
    </div>
      <button @click="navigateToSignup" class="button">Sign up</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {signIn} from "@/services/authService";
import {useCoachRouter} from "@/composable/useCoachRouter";

const {navigateToSignup, navigateToMyWorkouts} = useCoachRouter();
const errors = ref([]);
const email = ref("");
const password = ref("");
const submitForm = () => {
  errors.value = [];
  if (!email.value) {
    errors.value.push("Email required!");
  }
  if (!password.value) {
    errors.value.push("Password required");
  }
  if (!errors.value.length) {
    signIn(email.value, password.value)
        .then(() => {
          navigateToMyWorkouts()
        })
        .catch((error) => {
          errors.value.push(error.message);
        });
  }
};
</script>
<style lang="scss">
@use "../styles/mixins";
@use "../styles/components/form";

.login-wrapper {
  @include mixins.column-content-wrapper;
}
</style>
