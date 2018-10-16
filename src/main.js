// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {getToken} from "@/utils/auth"
import store from './store'

Vue.use(Element)

Vue.config.productionTip = false

// 路由拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
     document.title = to.meta.title
  }
  if (!getToken()) {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
