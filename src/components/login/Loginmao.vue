
<template>
 <div class="login-body">
   <div class="bg"></div>
   <div class="login-panel">
    <el-form  :model="formData" :rules="rules" ref="formDataRef" label-width="80px" class="login-register">

      <div class="login-title">超市管理系统</div>
      <el-form-item></el-form-item>
      <el-form-item label="账号:" prop="loginId" >
        <el-input type="text" v-model="formData.loginId" placeholder="请输入账号"></el-input>
      </el-form-item>
<!--      <el-form-item>  </el-form-item>-->

      <el-form-item label="密码:" prop="currentPassword" aria-placeholder="请输入密码">
        <el-input type="password" v-model="formData.currentPassword" placeholder="请输入密码" ></el-input>
      </el-form-item>

      <el-form-item></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(formDataRef)" style="width:100%">登录</el-button>

      </el-form-item>

    </el-form>

   </div>
   </div>
</template>

<script setup>
import {ref,reactive} from "vue";
import {ElMessage} from "element-plus";
import http from "../../util/http.js";
import router from "../../router/myRouter.js";
const formData =reactive({
  loginId:"",
  currentPassword:""
})
const formDataRef=ref()

const rules=reactive(
    {
      loginId:[{
        required:true, message:'登录账号不能为空！', trigger:'blur'},{
        min:3,max:15,message: "账号需要3-15位"
      }
        ],
      currentPassword:[{
        required:true, message:'密码不能为空！', trigger:'blur'},{
        min:3 ,max:15,message: '密码需要3-15位'
      }
       ]
    }
)

const login =async (form) =>{
  let valid =await form.validate();
  if(valid){
//模拟登录


    let res =await http.get('/user');

    let list=[];
    if(res.status==201||res.status==200){
      list =res.data;
    }
    let loginFlag=false;
    let userInfo={}
    for (let user of list){
      if(user.loginId===formData.loginId && user.currentPassword===formData.currentPassword){
        loginFlag=true;
        userInfo={
          id:user.id,
          loginId:user.loginId,
          userName:user.userName,
          userType:user.userType,
          currentStatus:user.currentStatus

        }
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
        break;
      }
    }
    if(loginFlag){
      if(userInfo.userType== 0){
        router.push("/app/goodsindexmao")
      }else if(userInfo.userType== 1){
        router.push("/app/goodsindexmao")
      }
    }else {
      ElMessage.error({
        message:'账号或者密码错误'
      })
    }

  }else{
    ElMessage.error({
      message:"用户账号密码不能为空！"
    })
  }
}






</script>



<style scoped>
.login-body{
  height: 100%;
  background-color:#15aef6 ;
  display: flex;
}
.bg{
  flex: 1;
  background-size: cover;
  background-position: center;
  background-size: 600px;
  background-repeat: no-repeat;
  background-image: url("../../assets/1a.png");
}
.login-panel{
  width: 430px;
  margin-right: 15%;
  margin-top: calc((100vh - 500px) /2);

}
.login-title{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}
.login-register{
  padding: 25px;
  background:whitesmoke ;
  border-radius: 20px;
  position: relative;
  width: 450px;
  margin: 0 auto;
}

</style>



