<template>
  <!--普通用户的首页框架-->
  <el-container class="index">
    <el-header class="header">
      <el-row>
        <!--左侧logo区域-->
        <el-col :span="12" class="logo-container">
          <img src="../../assets/20.png" class="logo"/>

          <span class="title">超市商品管理系统</span>
          <router-link to="'/app/homemao'"> </router-link>
        </el-col>
        <!--右侧用户信息区域-->
        <el-col :span="12" class="user">
          <el-link :underline="false" type="primary" @click="logout">
            <el-icon><switch-button/></el-icon>
          </el-link>
        </el-col>
      </el-row></el-header>
    <el-container class="container">
      <el-aside class="lefter">
        <div class="portrait"></div>
        <h4 class="loginname">用户名:&nbsp;{{userInfo.userName}}</h4>&nbsp;&nbsp;
        <el-scrollbar >
          <el-menu
              class="el-menu-vertical"
              background-color="#189edd"
              text-color="#fff"
              active-text-color="#409eff">
            <router-link to="/app/homemao">
              <el-menu-item index="1">
                <el-icon><House /></el-icon>主页
              </el-menu-item>
            </router-link>
            <el-sub-menu index="2">
              <template #title >
                <el-icon ><Goods /></el-icon>商品管理
              </template>
              <router-link to="/app/goodslistmao">
                <el-menu-item index="2-1">
                  <el-icon><List /></el-icon>全部商品
                </el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Avatar /></el-icon>会员管理
              </template>
              <router-link to="/app/userlistmao">
                <el-menu-item index="3-1">
                  <el-icon><User /></el-icon>会员列表
                </el-menu-item>
              </router-link>
              <el-menu-item index="3-2">
                <el-icon><Lock /></el-icon>会员禁用
              </el-menu-item>

              <el-menu-item index="3-3">
                <el-icon><Refresh /></el-icon>密码重置
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">

              <template #title>
                <el-icon><Menu /></el-icon>个人中心
              </template>
              <el-menu-item index="4-1">
                <el-icon><Avatar /></el-icon>个人信息
              </el-menu-item>
              <el-menu-item index="4-2">
                <el-icon><Lock /></el-icon>密码修改
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="5" @click="logout">
              <el-icon><SwitchButton /></el-icon>退出系统
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="content">
        <el-scrollbar>

          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

import router from "../../router/myRouter.js";
import {Avatar, Goods} from "@element-plus/icons-vue";
export default {
  name: "AppIndex",
  components: {Avatar, Goods},
//定义响应数据
  data:function () {
    return {
      userInfo: {userId: '',
        loginId: '',
        userName: ''
      }
    }
  },
  mounted() {

    if(JSON.parse(sessionStorage.getItem('userInfo')) != null){
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
//路由到默认首页页面
    router.push("/app/homemao")
  },
  methods:{
    logout:function () {
      sessionStorage.removeItem('userInfo')
      router.replace('/')
    }
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
}
.header {
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  min-width: 600px;padding: 5px;
  background: #324057;
  color: white;
  border-bottom: 1px solid #ffffff;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;

  letter-spacing: 3px;
  color: deepskyblue;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  color: deeppink;
  padding-right: 20px;
}
.container{
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 72px);
}
/*左侧菜单样式*/
.lefter {
  box-sizing: border-box;
  width: 220px;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color:#189edd ;
}
.el-menu {
  border: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
  margin: 0;
  padding: 0;
}
.el-menu-vertical {

  width: 220px;
  padding: 0;
  margin-bottom: 20px;
}
.el-submenu .el-menu-item {
  min-width: 220px;
}
.el-menu-item{
  width: 220px;
}
a {
  text-decoration: none;
}
.el-menu-item.is-active{
  background-color: lemonchiffon;
}
.content {

  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;}
.portrait{
  margin-left: 20px;
  width: 150px;
  height: 150px;
  border-radius: 50%; /*设置左边导航栏的模拟头像*/
  background-color: pink;
  background-image: url("../../assets/2.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
.loginname{
  font-size: 18px;
  color: lemonchiffon;
  box-sizing: border-box;
  margin-top: 20px;
    display: block;
  padding-left: 20px;

}
</style>