<template>
  <el-descriptions class="margin-top" :column="12" size="default" border>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon>
            <User />
          </el-icon>
          作者
        </div>
      </template>
      {{ props.articleAuthor }}
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Location /></el-icon>
          类型
        </div>
      </template>
      <el-tag size="small">{{ props.articleType }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Compass /></el-icon>
          类别
        </div>
      </template>
      <el-tag size="small">{{ props.articleCategory }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Hide /></el-icon>
          发布状态
        </div>
      </template>
      <el-tag size="small">{{ props.articleDraft }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Setting /></el-icon>
          id
        </div>
      </template>
      <el-tag size="small">{{ props.articleId }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Clock /></el-icon>
          发布时间
        </div>
      </template>
      {{ props.articleCreateTime }}
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><Clock /></el-icon>
          修改时间
        </div>
      </template>
      {{ props.articleModifyTime }}
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template #label>
        <div class="cell-item">
          <el-icon><WindPower /></el-icon>
          调试
        </div>
      </template>
      内容
    </el-descriptions-item>
    <el-descriptions-item span="12">
      <template #label>
        <div class="cell-item">
          <el-icon><ElemeFilled /></el-icon>
          标题
        </div>
      </template>
      <span class="title">{{ props.articleTitle }}</span>
    </el-descriptions-item>
    <el-descriptions-item span="12">
      <template #label>
        <div class="cell-item">
          <el-icon><SetUp /></el-icon>
          操作
        </div>
      </template>
      <div class="operation-box">
        <el-button plain>在前台查看</el-button>
        <el-button plain>修改文章</el-button>
        <el-button type="danger" plain @click="openDeleteConfirm"
          >删除文章</el-button
        >
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "deleted"): void;
}>();
import {
  Hide,
  User,
  ElemeFilled,
  Location,
  Compass,
  Clock,
  Setting,
  WindPower,
  SetUp,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ArticleHttp from "@/axios/ArticleHttp";

const props = defineProps<{
  articleId: number;
  articleTitle: string;
  articleAuthor: string;
  articleType: number;
  articleCategory: number;
  articleDraft: number;
  articleCreateTime: string;
  articleModifyTime: string;
}>();

const deleteArticlePromise = () =>
  ArticleHttp({
    url: "deleteArticle",
    method: "post",
    data: {
      articleId: props.articleId,
    },
  });
// 删除确认
const openDeleteConfirm = () => {
  ElMessageBox.confirm(
    "确实要删除标题为【" +
      props.articleTitle +
      "】，id为【" +
      props.articleId +
      "】的文章吗？",
    "Warning",
    {
      confirmButtonText: "必须删",
      cancelButtonText: "先不删了",
      type: "warning",
    }
  )
    .then(() => {
      deleteArticlePromise()
        .then((data) => {
          if (data.status === 200) {
            ElMessage({
              type: "success",
              message: "已删除",
              duration: 1000,
            });
            emit("deleted");
          } else {
            ElMessage({
              type: "error",
              message: "服务端错误，响应码不是200",
              duration: 1000,
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "error",
            message: "服务端错误，未收到服务器回应",
            duration: 1000,
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消，没有任何文章被删除",
        duration: 1000,
      });
    });
};
</script>

<style scoped>
.title {
  font-weight: 700;
}
.operation-box {
  display: flex;
  justify-content: right;
}
</style>
