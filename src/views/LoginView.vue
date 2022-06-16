<template>
  <div id="box">
    <h1 id="title">新闻网管理系统</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/login/LoginForm.vue";

localStorage.removeItem("access");
</script>

<style scoped>
#box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(https://www.nefu.edu.cn/__local/9/B3/C4/3130E398BAD9A20A969E6F80AD3_8F630E87_2A939.jpg?e=.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#title {
  margin-bottom: 30px;
  font-weight: 700;
  color: white;
  text-shadow: #444 3px 2px 4px;
}
</style>
