import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "base",
      redirect: "/panel",
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
      meta: { title: "用户管理系统登录" },
    },
    {
      path: "/panel",
      name: "Panel",
      component: () => import("@/views/PanelView.vue"),
      children: [
        {
          path: "",
          name: "PanelIndex",
          component: () => import("@/components/panel/IndexComp.vue"),
          meta: { title: "新闻网管理系统" },
        },
        {
          path: "manage",
          name: "PanelManage",
          component: () => import("@/components/panel/ArticleManage.vue"),
          meta: { title: "文章管理" },
        },
        {
          path: "category",
          name: "CategoryManage",
          component: () => import("@/components/panel/CategoryManage.vue"),
          meta: { title: "类别管理" },
        },
      ],
    },
    {
      path: "/editor",
      name: "Editor",
      component: () => import("@/views/EditorView.vue"),
      meta: { title: "编辑文章" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.path.startsWith("/login")) {
    localStorage.removeItem("access");
    next();
  } else {
    // 其他路径
    const accessString = localStorage.getItem("access") as string;
    if (accessString) {
      const access = JSON.parse(accessString);
      if (!access.token) {
        next("/login");
      } else {
        next();
      }
    } else {
      // 没有access
      next("/login");
    }
  }
});

export default router;
