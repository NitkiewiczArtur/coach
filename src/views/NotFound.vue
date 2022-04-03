<template>
  <div class="not-found-wrapper">
    <h1>Whoops!</h1>
    <h2>404 Page Not Found</h2>
    <button class="button button--purple" @click="navigateHome">Lets go back home</button>
  </div>
</template>

<script setup lang="ts">
import {useCoachRouter} from "@/composable/useCoachRouter";

const {navigateHome} = useCoachRouter()
</script>
<style lang="scss">
@use "../styles/mixins" as m;
@use "../styles/components/button";

.not-found-wrapper {
  @include m.flex-column-center;
  justify-content: center;
  height:100%;
}
h1{
  font-size:5rem;
}
h2{
  font-size:4rem;
}
@media screen and (max-width: 700px) {
  .content{
   height: 100%;
  }
}
</style>
