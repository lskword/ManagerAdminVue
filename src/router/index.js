import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/',
    hidden: true,
    component: ()=> import("@/views/Layout/index"),
    hidden: true
    // children: [
    //   {path: 'Index', component: ()=> import(""),name: 'index',},
    // ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true , name: "login", meta: {title: "登录页"}},
  { path: '*', component: () => import('@/views/login/index'), hidden: true },
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
