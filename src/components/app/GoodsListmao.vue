<template>
  <el-card>
    <template #header>
      <div>
        <span>商品列表</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button class="button" size="small" @click="goodsAdd()" type="primary">
          添加商品
        </el-button>
      </div>
    </template>
    <el-table :data="goodsInfolist" :stripe="true" style="width:100%">
      <el-table-column type="index" label="商品序号" align="center" width="100 ">
      </el-table-column>
      <el-table-column property="goodsName" label="商品名称" width="120">
      </el-table-column>
      <el-table-column property="goodsPrice" label="商品价格" width="120">
      </el-table-column>
      <el-table-column property="goodsAdress" label="商品地址" width="120">
      </el-table-column>
      <el-table-column property="goodsDate" label="进货时间" width="150">
        <template #default="scope">
          <span v-text="formatDate(scope.row.goodsDate)"></span>
        </template>
      </el-table-column>
      <el-table-column property="goodsType" label="种类" width="80">
      </el-table-column>
      <el-table-column property="currentStatus" label="提交订单" align="center" width="150">

        <template #default="scope">
          <span v-if="scope.row.currentStatus=='0'">
            <el-icon :size="30" color="#008000FF"><el-icon><RemoveFilled /></el-icon></el-icon>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
            <el-icon :size="30" color="#008000FF"><el-icon><SuccessFilled /></el-icon></el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column property="" label="商品操作" align="center">
        <template #default="scope">
          <span v-if="scope.row.currentStatus=='0'">
            <el-button size="small" plain type="primary" @click="goodsEdit(scope.$index)">更新商品信息</el-button>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
            <el-button size="small" disabled plain type="primary" @click="goodsEdit(scope.$index)">修改商品</el-button>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="scope.row.currentStatus=='0'">
          <el-button size="small" plain type="success" @click="goodsComplete(scope.$index)">进货</el-button>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
          <el-button size="small"
                     disabled
                     plain type="success"
                     @click="goodsComplete(scope.$index)">已进货</el-button>
            </span>
          &nbsp;
          <span v-if="scope.row.currentStatus=='0'">
          <el-button size="small"
                     disabled
                     plain type="primary"
                     @click="goodsReset(scope.$index)">退货</el-button>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
            <el-button size="small"
                       plain type="primary"
                       @click="goodsReset(scope.$index)">退货</el-button>
          </span>


          <el-button size="small"
                     plain type="danger"
                     @click="goodsDelete(scope.$index)">删除
          </el-button>



        </template>
      </el-table-column>
    </el-table>
    <!--对话框-->
    <el-dialog width="40%" v-model="dialog.show" :title="dialog.title" :close-on-click-modal='false'
               :close-on-press-escape='false' :modal-append-to-body='false'>
      <el-form :model="mymodel" :rules="myrule" ref="myform">
        <el-form-item label="商品名称" required prop="goodsName">
          <el-col :span="15">
            <el-input type="text" v-model="mymodel.goodsName">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="进货日期" required prop="goodsDate">
          <el-col :span="15">
            <el-date-picker v-model="mymodel.goodsDate" type="date" placeholder="选择商品日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" required prop="goodsPrice">
          <el-col :span="15">
            <el-input type="text" v-model="mymodel.goodsPrice">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" required prop="goodsAdress">
          <el-col :span="15">
            <el-input type="text" v-model="mymodel.goodsAdress">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="种类" >
          <el-select v-model="mymodel.goodsType"  placeholder="请选择商品种类" required prop="goodsType">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click='goodsSave("myform")'>保 存</el-button>
        <el-button @click="dialog.show = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import http from "../../util/http.js";
import {ElMessage} from "element-plus";
import option from "element-plus/es/components/tree/index";

export default {
  name: "goodsInfolist",

  data: function () {
    return {
      goodsInfolist: [],
      mymodel: {
        userId: "",
        id: "",
        goodsName: "",
        goodsDate: "",
        goodsPrice:"",
        goodsAdress:'',
        goodsType:'',
        currentStatus: 0
      },
      myrule: {
        goodsName: [
          {required: true, message: '商品名称不能为空', trigger: 'blur'},
        ],
        goodsDate: [
          {required: true, message: '商品日期不能为空', trigger: 'blur'},
        ],
        goodsPrice: [
          {required: true, message: '商品价格不能为空', trigger: 'blur'},
        ],
        goodsAdress:[
          { required: true, message: '商品地址不能为空', trigger: 'blur'}
        ],
        goodsType:[
          {required:true, message:'商品种类不能为空',trigger:'blur'}
        ]

      },
      dialog: {
        title: '',
        show: false,
        option: ''
      },
      selectedIndex: -1,
      userInfo: {},
      itemCurrentStatus: '',
      options: [
        {label: ' 食品类', value:' 食品类'},
        {label: ' 日用品类', value:' 日用品类'},
        {label: ' 服装类', value:'服装类'},
        {label: ' 数码类', value:' 数码类'},
        {label: ' 酒烟类', value:' 酒烟类'},
        {label: '儿童类 ', value:' 儿童类'},
        {label: '纺织类 ', value:' 纺织类'},
      ],

  }
  },

  mounted() {
    this.initTable();
  },

  methods: {
    option,

    initTable() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      http.get("/goodsInfo").then(res => {

        this.goodsInfolist = res.data;
      })
    }
,
    goodsAdd: function () {

      this.mymodel = {
        userId: "",
        id: "",
        goodsName: "",
        goodsDate: "",
        goodsPrice:"",
        goodsAdress:"",
        goodsType: "",
        currentStatus: 0
      }

      this.dialog = {
        title: '添加商品信息',
        show: true,
        option: 'add'
      }
    },

    goodsEdit: function (index) {

      let item = this.goodsInfolist[index];
      this.mymodel = {
        userId: item.userId,
        id: item.id,
        goodsName: item.goodsName,
        goodsDate: item.goodsDate,
        goodsPrice: item.goodsPrice,
        goodsAdress: item.goodsAdress,
        currentStatus: item.currentStatus,
        goodsType: item.goodsType
      }

      this.selectedIndex = index

      this.dialog = {
        title: '修改商品',
        show: true,
        option: 'edit'
      }
    },

    goodsSave(formName) {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if (this.dialog.option == 'add') {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.mymodel.userId = this.userInfo.userId;
            http.post("/goodsInfo", this.mymodel).then(res => {

              ElMessage({
                message: '添加商品成功！',
                type: 'success'
              })


              this.initTable();

              this.mymodel = {
                userId: "",
                id: "",
                goodsName: "",
                goodsDate: "",
                goodsPrice:"",
                goodsAdress: "",
                goodsType: "",
                currentStatus: 0
              }

              this.dialog = {
                title: '',
                show: false,
                option: ''
              }
            })
          }
        })
      } else if (this.dialog.option == 'edit') {

        this.$refs[formName].validate((valid) => {
          if (valid) {

            http.put("/goodsInfo/" + this.mymodel.id, this.mymodel).then(res => {
              ElMessage({
                message: '更新产品成功！',
                type: 'success'
              })

              this.initTable();

              this.mymodel = {
                userId: "",
                id: "",
                goodsName: "",
                goodsDate: "",
                goodsPrice:"",
                goodsAdress: "",
                goodsType: "",
                currentStatus: 0
              }

              this.dialog = {
                title: '',
                show: false,
                option: ''
              }
            })
          }
        })
      }
    },

    goodsComplete: function (index) {
      let item = this.goodsInfolist[index]

      item.currentStatus = 1

      http.put("/goodsInfo/" + this.goodsInfolist[index].id, item).then(res => {
        ElMessage({
          message: '进货成功！',
          type: 'success'
        })

        this.initTable();
      })
    },

    goodsReset: function (index) {
      let item = this.goodsInfolist[index]
      item.currentStatus = 0
      http.put("/goodsInfo/" + this.goodsInfolist[index].id, item).then(res => {
        ElMessage({
          message: '商品已退货！',
          type: 'success'
        })

        this.initTable();
      })
    },
//删除任务
    goodsDelete: function (index) {

      http.delete("/goodsInfo/" + this.goodsInfolist[index].id).then(res => {
        if (res.status == '200') {
          ElMessage('已删除该商品！')
          this.goodsInfolist.splice(index, 1)
        }
      })
    },
//时间格式化成中国时间
    formatDate: function (goodsDate) {
      let date = new Date(goodsDate);
      let seperator = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator + month + seperator + strDate;
      return currentdate;
    },
  }
}
</script>
<style scoped>
</style>
