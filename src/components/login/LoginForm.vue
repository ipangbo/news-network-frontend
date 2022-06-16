<template>
  <div id="login-box">
    <el-card shadow="hover">
      <h2 id="login-title">登录</h2>
      <div class="input-box">
        <el-icon :size="35">
          <user style="margin-right: 10px" />
        </el-icon>
        <el-input v-model="username" placeholder="用户名" />
      </div>
      <div class="input-box">
        <el-icon :size="35">
          <lock style="margin-right: 10px" />
        </el-icon>
        <el-input
          v-model="password"
          type="password"
          placeholder="密码"
          show-password
        />
      </div>
      <div class="button-box">
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginHttp from "@/axios/LoginHttp";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const username = ref();
const password = ref();
const router = useRouter();

const login = () => {
  LoginHttp.post("", {
    userName: username.value,
    userPass: password.value,
  })
    .then((data: any) => {
      if (data && data.token) {
        localStorage.setItem(
          "access",
          JSON.stringify({
            username: username.value,
            token: data.token,
          })
        );
        if (200 === data.status) {
          ElMessage({
            message: "登陆成功，您现在是" + username.value,
            type: "success",
            duration: 1000,
          });
          router.push("/panel");
        } else {
          ElMessage({
            showClose: true,
            message: "密码错误，请重新输入",
            type: "error",
          });
        }
      }
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: "网络错误",
        type: "error",
      });
    });
};
</script>

<style scoped>
#login-box {
  width: 400px;
}

#login-title {
  margin-bottom: 20px;
}

.input-box {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.button-box {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}
</style>
