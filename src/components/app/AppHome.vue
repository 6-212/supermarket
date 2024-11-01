<template>

  <h1>欢迎来到超市管理系统</h1>
  <div>
    <el-carousel trigger="click" :autoplay="false" class="el-carousel__container" >
      <el-carousel-item  v-for="item in urls" :key="item"  >
        <el-image :src="item" fit="cover"  ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div >
  <el-form-item></el-form-item>
<div class="auto-wrap">
 欢迎来到超市管理系统首页！

在这里，您可以方便地管理您的超市商品信息、库存、销售数据等，实现超市的数字化管理，提高工作效率。

通过本系统，您可以：

快速查看商品信息：系统支持商品信息的批量导入和导出，方便您快速查看和编辑商品信息。
实时更新库存：系统实时跟踪库存变化，让您随时掌握库存情况，避免缺货或积压现象。
会员管理：系统支持会员管理功能，记录会员购买记录和积分情况，提高会员满意度和忠诚度。
订单管理：系统支持订单管理功能，方便您处理客户订单，提高客户服务水平。
使用超市管理系统，让您轻松管理超市，提高工作效率，实现数字化转型。欢迎您加入我们的大家庭，共同创造更美好的未来！
</div>
</template>

<script setup>
import { ElCarousel, ElCarouselItem,ElImage } from 'element-plus'
const urls = [
   'https://img.zcool.cn/community/01437f59c8a897a8012053f8fadf0a.jpg@1280w_1l_2o_100sh.jpg',
  'https://img.zcool.cn/community/0165135844bedaa801219c77ad4e61.jpg@1280w_1l_2o_100sh.jpg',
  'https://img.zcool.cn/community/01a2495a139b8da801205187c20a7c.jpg@1280w_1l_2o_100sh.jpg',
  'https://1.s91i.faiusr.com/4/AFsIgKhEEAQYACCd6drhBSjLw5WKBDCADzjYBA!800x800.png?_tm=3&v=1611805440764',
  'https://img.zcool.cn/community/01418a58b8cf69a801219c770b3ea0.jpg@2o.jpg',
]

</script>

<style>
.el-carousel__container{
  height: 400px;
}
.el-image{
  width: 100%;
  height: 100%;
}
.auto-wrap {


  width: 100%;
  word-wrap: break-word;
}
</style>
