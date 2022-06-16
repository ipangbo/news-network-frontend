<template>
  <el-button type="primary">新建文章</el-button>
  <el-button @click="refresh">刷新</el-button>

  <div class="news-items-box">
    <div
      class="news-item-box"
      v-for="item in articleList"
      :key="item.articleId"
    >
      <ArticleDescription
        :article-id="item.articleId"
        :article-title="item.articleTitle"
        :article-author="item.articleAuthor"
        :article-type="item.articleType"
        :article-category="item.articleCategory"
        :article-draft="item.articleDraft"
        :article-create-time="item.articleCreateTime.replace('T', ' ')"
        :article-modify-time="item.articleModifyTime.replace('T', ' ')"
      ></ArticleDescription>
    </div>
  </div>
  <el-pagination
    v-model:currentPage="currentPage"
    background
    layout="prev, pager, next, jumper"
    :page-count="Math.ceil(articleCount / 10)"
  />
</template>

<script setup lang="ts">
import ArticleDescription from "@/components/panel/ArticleDescription.vue";
import { ref, watchEffect } from "vue";
import ArticleHttp from "@/axios/ArticleHttp";
import { ElMessage, ElMessageBox } from "element-plus";
import type { getAllVO } from "@/datasource/Types";

const articleList = ref<getAllVO[]>([]);
const currentPage = ref(1);
const getAllArticlePromise = () =>
  ArticleHttp({
    url: "getAll?page=" + currentPage.value,
    method: "get",
  });
const showGetAllArticleErrorMessage = () => {
  ElMessage({
    message: "获取文章失败",
    type: "error",
    duration: 1000,
  });
};
const refresh = () => {
  getArticleCountPromise()
    .then((data) => {
      articleCount.value = parseInt(data.data);
    })
    .catch(() => {
      showGetArticleCountErrorMessage();
    });
  // 由于getAllArticlePromise依赖于currentPage
  // 所以currentPage的更改会触发watchEffect
  // 此外，watchEffect会在初始化时执行一遍回调函数
  getAllArticlePromise()
    .then((data) => {
      articleList.value = data.data;
      openRefreshMessage();
    })
    .catch(() => {
      showGetAllArticleErrorMessage();
    });
};

// 为了分页，需要得到文章总数
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

const openRefreshMessage = () => {
  ElMessage({
    message: "已刷新，现在有" + articleCount.value + "条信息",
    type: "success",
    duration: 1000,
  });
};

// 分页切换的行为
watchEffect(() => {
  refresh();
});
</script>

<style scoped>
.news-items-box {
  margin-top: 15px;
}

.news-item-box {
  margin-bottom: 20px;
}
</style>
