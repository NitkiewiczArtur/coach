<template>
  <div class="wrapper">

  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onBeforeMount} from "vue";

const router = useRouter();
onBeforeMount(()=>{

})
</script>
<style lang="scss">
@use "../styles/variables" as v;
@use "../styles/mixins" as m;
.wrapper {
 @include m.flex-column-center
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
