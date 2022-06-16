<template>
  <div class="button-box">
    <el-button @click="refresh">刷新</el-button>
  </div>
  <div class="card-box">
    <InfoCard
      card-name="文章信息"
      :count="articleCount || '-'"
      detail-link="/panel/manage"
      :icon="Eleme"
    ></InfoCard>
  </div>
</template>

<script setup lang="ts">
import InfoCard from "@/components/panel/InfoCard.vue";
import { Eleme } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus/es";
import ArticleHttp from "@/axios/ArticleHttp";

const articleCount = ref();
const getArticleCountPromise = () =>
  ArticleHttp({
    url: "getArticleCount",
    method: "get",
  });
const showGetArticleCountErrorMessage = () => {
  ElMessage({
    message: "获取文章数量失败",
    type: "error",
    duration: 1000,
  });
};
getArticleCountPromise()
  .then((data) => {
    articleCount.value = data.data;
  })
  .catch(() => {
    showGetArticleCountErrorMessage();
  });
const refresh = () => {
  getArticleCountPromise()
    .then((data) => {
      articleCount.value = data.data;
      ElMessage({
        message: "已成功刷新",
        type: "success",
        duration: 1000,
      });
    })
    .catch(() => {
      showGetArticleCountErrorMessage();
    });
};
</script>

<style scoped>
.card-box {
  display: flex;
}

.button-box {
  margin-bottom: 15px;
}
</style>
