<template>
  <el-card class="user-profile">
    <h3>个人资料</h3>
    <el-form :model="userProfile" label-width="120px">
      <el-form-item label="登录ID">
        <el-input v-model="userProfile.loginId" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userProfile.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userProfile.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userProfile.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue"; j
import http from "../../util/http.js";
import { ElMessage } from "element-plus";
let goodslist = sessionStorage.getItem('userInfo');
const userProfile = reactive({
  id: 1,
  loginId: goodslist.loginId,
  userName: "风信子",
  currentPassword: "123456",
  currentPassword2: "123456",
  email: "admin@hbxy.cn",
  mobile: "18688888888",
  userType: "1",
  currentStatus: "0"
});

const saveProfile = async () => {
  let res = await http.put(`/user/${userProfile.id}`, userProfile);
  if (res.status === 200) {
    ElMessage.success("个人资料保存成功");
  } else {
    ElMessage.error("保存失败，请重试");
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
