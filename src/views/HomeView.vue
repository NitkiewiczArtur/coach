<template>
  <div class="home-wrapper">
    <div class="home-content">
      <h3>Welcome to COACH.</h3>
      <h3>A web application dedicated to weightlifting training progress monitoring and analysis.</h3>
     <h3> Whenever You ready, <br><router-link to="/signUp" class="nav-link">sign up</router-link>  and <b>START TRAINING!</b></h3>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
@use "src/styles/variables" as v;
.home-wrapper {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home-content{
  background-color: v.$primary-color;
  color: white;
  height:40%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.nav-link{
  font-size:2rem;
}
</style>
