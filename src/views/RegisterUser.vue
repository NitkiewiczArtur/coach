<template>
  <div class="register-wrapper">
    <form>
      <h3>Sign up</h3>
      <template v-for="error in errors" :key="error">
        <div class="error">{{ error }}</div>
      </template>
      <div>
        <input type="email" v-model="email" placeholder="email"/>
      </div>
      <div>
        <input type="password" v-model="password" placeholder="password"/>
      </div>
      <button class="button" type="submit" @click="submitForm">Sign up</button>
    </form>
    <div>
      <h4>You already have an account?</h4>
    </div>
    <button @click="navigateToLogin" class="button">Log in</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {signUp} from "@/services/authService";
import {useCoachRouter} from "@/composable/useCoachRouter";

const {navigateToLogin, navigateToMyWorkouts} = useCoachRouter();
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
    signUp(email.value, password.value)
        .then(() => {
          navigateToMyWorkouts();
        })
        .catch((error) => {
          errors.value.push(error.message);
        });
  }
};
</script>
<style scoped lang="scss">
@use "../styles/mixins";
@use "../styles/components/form";
@use "../styles/components/button";

.register-wrapper {
  @include mixins.column-content-wrapper;
}
</style>
