<template>
  <div class="wrapper">
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
    <router-link to="/register">
      <button class="button">Sign up</button>
    </router-link>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {signIn} from "@/services/authService";

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
    signIn(email.value, password.value)
        .then((userCredential) => {
          router.push({name: "explore"});
        })
        .catch((error) => {
          errors.value.push(error.message);
        });
  }
};
</script>
<style lang="scss">
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
    background-color: #336699;
  }
}
</style>
