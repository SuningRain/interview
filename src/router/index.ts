/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2022-09-27 15:59:16
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-24 16:16:34
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: '/vueCode/diff',
      name: 'vueCode/diff',
      component: () => import('@/views/vueCode/diff/index.vue')
    }
  ],
});

export default router;
