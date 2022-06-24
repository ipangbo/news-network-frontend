<template>
  <div class="type-box">
    <div class="tool-box">
      <h2>新闻网</h2>
      <el-button type="primary" plain class="left-margin">增加类别</el-button>
    </div>
    <div class="category-box">
      <el-card
        class="box-card"
        v-for="item in categories[0]"
        :key="item.categoryId"
      >
        <template #header>
          <div class="card-header">
            <h4>{{ item.categoryName }}</h4>
          </div>
        </template>
        <div class="card-tool-box">
          <el-button type="primary" :icon="Edit" circle />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="openDeleteConfirm(item.categoryId, item.categoryName)"
          />
        </div>
      </el-card>
    </div>
  </div>
  <div class="type-box">
    <div class="tool-box">
      <h2>新闻公告</h2>
      <el-button type="primary" plain class="left-margin">增加类别</el-button>
    </div>
    <div class="category-box">
      <el-card
        class="box-card"
        v-for="item in categories[1]"
        :key="item.categoryId"
      >
        <template #header>
          <div class="card-header">
            <h4>{{ item.categoryName }}</h4>
          </div>
        </template>
        <div class="card-tool-box">
          <el-button type="primary" :icon="Edit" circle />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="openDeleteConfirm(item.categoryId, item.categoryName)"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryHttp from "@/axios/CategoryHttp";
import { ref } from "vue";
import type { GetCategoryByAssociatedTypeVO } from "@/datasource/Types";
import { ElMessage, ElMessageBox } from "element-plus/es";
import { Edit, Delete } from "@element-plus/icons-vue";

const getCategoriesListByAssociatedTypePromise = (type: number) =>
  CategoryHttp({
    url: "getCategoriesListByAssociatedType?type=" + type,
    method: "get",
  });

const showGetArticleCountErrorMessage = () => {
  ElMessage({
    message: "获取类别信息失败",
    type: "error",
    duration: 1000,
  });
};

const categories = ref<GetCategoryByAssociatedTypeVO[][]>([]);
const refreshCategories = async () => {
  categories.value = [];
  for (let i = 1; i <= 2; i++) {
    await getCategoriesListByAssociatedTypePromise(i)
      .then((data) => {
        if (data.status === 200) {
          categories.value.push(data.data);
        } else {
          showGetArticleCountErrorMessage();
        }
      })
      .catch(() => {
        showGetArticleCountErrorMessage();
      });
  }
};
refreshCategories();

const openDeleteConfirm = (categoryId: number, categoryName: string) => {
  ElMessageBox.confirm(
    "确实要删除名称为【" +
      categoryName +
      "】，id为【" +
      categoryId +
      "】的类别吗？",
    "删除确认",
    {
      confirmButtonText: "必须删",
      cancelButtonText: "先不删了",
      type: "warning",
    }
  )
    .then(() => {
      CategoryHttp({
        url: "deleteCategoryById",
        method: "post",
        data: {
          categoryId: categoryId,
        },
      })
        .then((data) => {
          if (data.status === 200) {
            ElMessage({
              type: "success",
              message: "已删除",
              duration: 1000,
            });
            refreshCategories();
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
        message: "已取消，没有任何类别被删除",
        duration: 1000,
      });
    });
};
</script>

<style scoped>
.type-box {
  margin-bottom: 30px;
}
.tool-box {
  display: flex;
  align-items: center;
}
.left-margin {
  margin-left: 20px;
}
.category-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.box-card {
  width: 200px;
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.card-tool-box {
  text-align: right;
}
</style>
