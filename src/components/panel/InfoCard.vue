<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="card-name">{{ props.cardName }}</span>
        <el-button class="button" type="text" @click="handleJump"
          >详情</el-button
        >
      </div>
    </template>
    <div class="card-content">
      <el-icon :size="60" color="#409EFF">
        <component :is="props.icon"></component>
      </el-icon>
      <div class="count">{{ props.count }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Eleme } from "@element-plus/icons-vue";

const router = useRouter();

const props = defineProps<{
  cardName: string;
  count: string | number;
  detailLink: string;
  icon: typeof Eleme;
}>();

const handleJump = () => {
  router.push(props.detailLink);
};
</script>

<style scoped>
.box-card {
  flex: 1;
  max-width: 300px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-name {
  font-weight: 700;
}
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count {
  font-weight: 700;
  font-size: 40px;
  color: #444;
}
</style>
