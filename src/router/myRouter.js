//定义全局路由: 页面组件之间的跳转逻辑关系
//导入vue-router函数
import {createWebHistory,createRouter} from 'vue-router'
//需要路由的页面组件,都需要导入,再定义路由关系

import AppHome from "../components/app/AppHome.vue"
import Loginmao from "../components/login/Loginmao.vue";
import UserListmao from "../components/app/UserListmao.vue";
import GoodsIndexmao from "../components/app/GoodsIndexmao.vue";
import GoodsListmao from "../components/app/GoodsListmao.vue";
//创建路由管理器
const router = createRouter({
    history: createWebHistory(),// 路由模式
    routes: [
        {
            path: '/', //浏览器访问 / 时,重定向到/login
            redirect: 'loginmao'
        },
        {//所有的组件要跳转，必须先命名路由
            path: '/loginmao', //访问的url
            name: 'loginmao',
            component: Loginmao //页面组件名称
        },
        {//所有的组件要跳转，必须先命名路由
            path: '/app/goodsindexmao',
            name: 'appgoodsindexmao',
            component: GoodsIndexmao,
            children:[//appindex组件包含的子组件
                { path: '/app/loginmao', redirect: to => '/loginmao'},
                { path: '/app/homemao', name: 'homemao', component: AppHome },
                { path: '/app/goodslistmao', name: 'todolistmao', component: GoodsListmao },
                { path: '/app/userlistmao', name: 'userlistmao', component: UserListmao },


            ]
        },
    ]
})
//全局路由守护，必须登录后，才能访问vue中的页面组件
router.beforeEach(async (to, from) => {
    let userInfo = sessionStorage.getItem('userInfo');
// 检查用户是否已登录 ，并且要访问的url不等于/login 避免无限重定向
    if (!userInfo && to.path !== '/loginmao') {
// 重定向到登录页面
        return { path: '/loginmao' }
    }
})
export default router;

