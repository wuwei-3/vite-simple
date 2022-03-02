/*
 * @Author: wuwei
 * @Date: 2022-02-28 20:10:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-02-28 20:37:56
 * @FilePath: \vite-simple\src\router\index.js
 */
import Index from '../views/index.vue'
import Home from '../views/home/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

/* 路由列表 */
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
        /* 私有钩子 */
        beforeEnter: (to, from) => {
          return true
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Home,
        meta: { requiresAuth: false },
      },
    ]
  }
]

/* 基础路由 */
const router = createRouter({
  routes: routes,
  history: createWebHistory(),
  // 始终滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  },
})

/* 导航守卫 */
router.beforeEach((to, from) => {
  // !auth.isLoggedIn()
  if (to.meta.requiresAuth) {
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})


/* 获取当前路由方法
* useRouter === $router
* useRoute === $route
* router.push() 跳转方式
* router.go(1) 返回
*/

export default router