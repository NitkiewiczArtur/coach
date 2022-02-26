<template>
  <div class="wrapper">
    <form @submit.prevent="submitForm">
      <h3>Rejestracja</h3>
      <template v-for="error in errors" :key = "error">
        <div class="error">{{ error }}</div>
      </template>
      <div>
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div>
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button class="button" type="submit">Register</button>
    </form>
    <div>
      <h4>Posiadasz już konto?</h4>
    </div>
    <router-link to="/logIn">
      <button class="button">Zaloguj się</button>
    </router-link>
  </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        router.replace({ name: "home" });
      })
      .catch((error) => {
        errors.value.push(error.message);
      });
  }
};
</script>
<style lang="scss">
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
  color: var(--white);
  background-color: var(--primary);
  border: none;

  &:hover {
    background-color: #336699;
  }
}
</style>
