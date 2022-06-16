<template>
  <div class="header-box">
    <div id="header-control">
      <el-page-header
        :title="'退出登录 ' + access.username"
        content="磅礴新闻网管理系统"
        @back="goBack"
        :icon="MoonNight"
      />
    </div>
    <div id="hitokoto-box" @click="fetchHitokoto">
      <transition>
        <div id="hitokoto" v-show="showHitokoto">
          {{ hitokoto }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { MoonNight } from "@element-plus/icons-vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const hitokoto = ref();
const showHitokoto = ref(false);
const router = useRouter();
const access = JSON.parse(localStorage.getItem("access") as string);
const goBack = () => {
  router.push("/login");
};
const fetchHitokoto = () => {
  showHitokoto.value = false;
  axios({
    url: "https://v1.hitokoto.cn?c=i",
    method: "get",
  })
    .then((resp) => {
      return resp.data;
    })
    .then((data) => {
      hitokoto.value = data.hitokoto;
    })
    .catch(() => {
      console.log("一言出现问题");
    });
  showHitokoto.value = true;
};
onMounted(() => {
  fetchHitokoto();
});
</script>

<style scoped>
.header-box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#header-control {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
