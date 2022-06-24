<template>
  <div id="menu-bar-box">
    <el-menu class="el-menu-vertical-demo" router :default-active="route.path">
      <el-menu-item index="/panel">
        <el-icon>
          <Menu />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/panel/manage">
        <el-icon>
          <Document />
        </el-icon>
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="/panel/category">
        <el-icon>
          <Collection />
        </el-icon>
        <span>类别管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu, Collection } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
#menu-bar-box {
  width: 100%;
  height: 100%;
}
.menu-title {
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  margin: 10px 0;
}
.el-menu.el-menu-vertical-demo {
  height: 100%;
  padding-top: 10px;
}
h6.menu-title {
  font-size: 16px;
}
.el-menu-item.is-active,
.el-menu-item:hover {
  border-radius: 0 50px 50px 0;
}
</style>
