<template>
  <div class="navbar-wrapper">
    <div class="logo-wrapper">
      <span><img src="../../assets/hantel.svg" alt="logo"/></span>
      <span class="purple-color">C</span><span>OACH</span>
      <button
          class="button button--triangle button--triangle--white"
          v-if="isMobileScreen"
          @click="toggleShowNavIfMobile"
      >
        {{ isNavHidden ? "▲" : "▼" }}
      </button>
    </div>
    <div class="nav-button-group" v-show="!isNavHidden">
      <router-link class="nav-link" to="/exploreExercises">
        <div class="nav-button" @click="toggleShowNavIfMobile">Explore</div>
      </router-link>
      <router-link class="nav-link" to="/myWorkouts">
        <div class="nav-button" @click="toggleShowNavIfMobile">My Workouts</div>
      </router-link>
      <router-link v-if="!loggedIn" class="nav-link" to="/logIn">
        <div class="nav-button" @click="toggleShowNavIfMobile">Sign in</div>
      </router-link>
      <div v-else class="nav-button" @click="signOut">Sign out</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import useCoachRouter from "@/composable/useCoachRouter";
import useScreen from "@/composable/useScreen";
import {store} from "@/store";

const {navigateHome} = useCoachRouter()
const isNavHidden = ref(false);
const loggedIn = computed(() => store.getters['auth/isUserAuth'])
const {isMobileScreen} = useScreen()

const signOut = async () => {
  await store.dispatch('auth/signOut')
  await navigateHome();
};

const toggleShowNavIfMobile = () => {
  if (isMobileScreen.value) {
    isNavHidden.value = !isNavHidden.value;
  }
};
const init = () => {
  if (isMobileScreen.value) {
    toggleShowNavIfMobile();
  }
}

watch(isMobileScreen, (newIsMobileScreen) => {
  isNavHidden.value = newIsMobileScreen;
})

onMounted(() => {
  init()
  store.dispatch('auth/onAuthStateChanged')
});
</script>

<style scoped lang="scss">
@use "../../styles/variables" as v;
@use "../../styles/components/navbar";

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
}

.purple-color{
  color: v.$info;
}
button {
  margin-left: 0.5rem;
}

</style>
