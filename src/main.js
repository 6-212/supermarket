import { createApp } from 'vue'
//第1步 引用element-plus axios vue-router
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons-vue'
// 将自动设置 Day.js 的国际化设置为 'zh-cn'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import router from "./router/myRouter.js";
import http from "./util/http.js";




import './style.css'
import App from './App.vue'

const app=createApp(App)

app.use(ElementPlus,{locale})
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key])
})
app.use(router)


app.mount('#app')
