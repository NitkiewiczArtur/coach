<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {onAuthStateChange, logOut} from "@/services/authService";
import router from "@/router";

export default defineComponent({
  setup() {
    const isModalOpen = ref(false);
    const isMobileScreen = computed(() => window.innerWidth < 700);
    const isNavHidden = ref(false);
    const loggedIn = ref(false);
    const currentUser = ref(null)
    const toggleShowNav = () => {
      if (isMobileScreen.value) {
        isNavHidden.value = !isNavHidden.value;
      }
    };
    const signOut = () => {
      logOut().then(() => {
        router.push("/")
      }).catch((error) => console.log(error))
    };
    onMounted(() => {
      if (isMobileScreen.value) {
        toggleShowNav();
      }
      //TODO: check if should be created
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
    return {
      isModalOpen,
      isMobileScreen,
      isNavHidden,
      loggedIn, currentUser,
      toggleShowNav,
      signOut
    };
  },
});
</script>

<template>
  <div class="navbar-wrapper">
    <div class="logo">
      <span><img src="../assets/hantel.svg" alt="logo"/></span>
      <span>COACH</span>
      <button
          class="toggle-nav-button"
          v-if="isMobileScreen"
          @click="toggleShowNav"
      >
        ▼
      </button>
      <div class="user-miniature">{{currentUser? currentUser.email.charAt(0): ""}}</div>
    </div>
    <div class="nav-button-group" v-if="!isNavHidden">
      <router-link class="nav-link" to="/explore">
        <div class="nav-button" @click="toggleShowNav">Explore</div>
      </router-link>
      <router-link class="nav-link" to="/">
        <div class="nav-button" @click="toggleShowNav">My Workouts</div>
      </router-link>
      <router-link v-if="!currentUser" class="nav-link" to="/register">
        <div class="nav-button" @click="toggleShowNav">Sign up</div>
      </router-link>
      <div v-if="currentUser" class="nav-button" @click="signOut">Sign out</div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  font-size: 2rem;
}
.user-miniature{
  font-size: 1rem;
}
.toggle-nav-button {
  background: transparent;
  border: none !important;
  color: var(--white);
}

.navbar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary);
  color: var(--white);
}

.nav-button-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 16rem;
}

.nav-button {
  text-align: center;
  padding: 1rem;
}

@media screen and (min-width: 700px) {
  .navbar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin: 1rem 0 1rem 0;
    background: var(--primary);
    color: var(--white);
  }

  .toggle-nav-button {
    display: none;
  }

  .nav-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
  }
}
</style>
