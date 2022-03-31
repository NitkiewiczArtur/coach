<template>
  <div class="wrapper">
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
    <router-link to="/logIn">
      <button class="button">Log in</button>
    </router-link>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {signUp} from "@/services/authService";

const router = useRouter();
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
          router.push({name: "explore"})
        })
        .catch((error) => {
          errors.value.push(error.message);
        });
  }
};
</script>
<style scoped lang="scss">
@use "../styles/variables" as v;

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

input {
  padding: 1rem;
  margin: 1rem;
}

input:focus {
  border: dodgerblue;
}

.button {
  padding: 0.5rem;
  color: v.$secondary-color;
  background-color: v.$primary-color;
  border: none;

  &:hover {
  }
}
</style>
