<template>
  <div  v-show="isLoading" class="spinner-wrapper">
    <div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {store} from "@/store";
import {computed} from "vue";

const isLoading = computed(() => store.getters['loader/isLoading'])
</script>
<style lang="scss" scoped>
@use "../../styles/mixins" as m;
@use "../../styles/variables" as v;

.spinner-wrapper {
  height: 100%;
  position: fixed;
  z-index: 122;
  width: 100%;
  top: 0;
  margin-top:30vh;
}

.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;

  -webkit-animation: sk-rotate 2.0s infinite linear;
  animation: sk-rotate 2.0s infinite linear;
}

.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: v.$third-color;
  border-radius: 100%;

  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate {
  100% {
    -webkit-transform: rotate(360deg)
  }
}

@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg)
  }
}

@-webkit-keyframes sk-bounce {
  0%, 100% {
    -webkit-transform: scale(0.0)
  }
  50% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
