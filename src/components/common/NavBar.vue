<template>
  <div class="navbar-wrapper">
    <div class="logo-wrapper">
      <span><img src="../../assets/hantel.svg" alt="logo"/></span>
      <span class="purple">C</span><span>OACH</span>
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
      <router-link v-if="!currentUser" class="nav-link" to="/logIn">
        <div class="nav-button" @click="toggleShowNavIfMobile">Sign in</div>
      </router-link>
      <div v-else class="nav-button" @click="signOut">Sign out</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {onAuthStateChange, signOutUser} from "@/services/authService";
import useCoachRouter from "@/composable/useCoachRouter";
import {isMobileScreen} from "@/utils/utils";

const {navigateHome} = useCoachRouter()
const isNavHidden = ref(false);
const loggedIn = ref(false);
const currentUser = ref(null)

const signOut = () => {
  signOutUser().then(() => {
    navigateHome();
  }).catch((error) => console.log(error))
};
//Showing and hiding depending on mobile/desktop
const toggleShowNavIfMobile = () => {
  if (isMobileScreen) {
    isNavHidden.value = !isNavHidden.value;
  }
};
const initMobile = () => toggleShowNavIfMobile();

onMounted(() => {
  if (isMobileScreen) {
    initMobile();
  }
  //Wywalić do vuexa? a co z api firebasowym? authService
  onAuthStateChange((user) => {
    if (user) {
      currentUser.value = user
      loggedIn.value = true
    } else {
      currentUser.value = null
      loggedIn.value = false
    }
  })
});
</script>

<style scoped lang="scss">
@use "../../styles/variables" as v;
@use "../../styles/mixins";

.navbar-wrapper {
  @include mixins.flex-column-center;
  background: v.$primary-color;
  color: v.$secondary-color;
  min-height: 3rem;
}

.nav-button-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 16rem;

  .nav-button {
    text-align: center;
    padding: 1rem;

    &:hover {
      color: v.$info;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 700px) {
  .navbar-wrapper {
    @include mixins.flex-row-center;
    justify-content: space-between;
    padding: 1rem;
    background: v.$primary-color;
    color: v.$secondary-color;
  }

  .toggle-nav-button {
    display: none;
  }

  .nav-button-group {
    flex-direction: row;
    justify-content: space-between;
    height: auto;
  }
}

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
}

.purple{
  color: v.$info;
}
button {
  margin-left: 0.5rem;
}

</style>
