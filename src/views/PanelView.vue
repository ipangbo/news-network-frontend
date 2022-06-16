<template>
  <div class="common-layout full-height">
    <el-container class="full-height">
      <el-header class="header">
        <HeaderComp></HeaderComp>
      </el-header>
      <el-container class="full-height">
        <el-aside width="230px">
          <MenuBar></MenuBar>
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuBar from "@/components/panel/MenuBar.vue";
import HeaderComp from "@/components/panel/HeaderComp.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.full-height {
  height: 92vh;
}
.header {
  border-bottom: 1px solid #eee;
  height: 8vh;
}
</style>
