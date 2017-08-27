// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueResource from 'vue-resource'
//前端路由 SPA Single Page Application 单页应用
import VueRouter from 'vue-router'
//引入bootstrap
/*import 'bootstrap/dist/css/bootstrap.css'*/
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 引入echarts
import echarts from 'echarts'

//页面由许多组件组成vm,数据管理中心
//自动的引入store目录下的index.js
import store from './store'

//导入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//导入mock
import Mock from './mock'
Mock.bootstrap();

//导入组件
import Index from './components/Index.vue'
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import ArticleList from './components/ArticleList.vue'
import Admin from './components/Admin.vue'
import ArticleAdmin from './components/ArticleAdmin.vue'
import LogsAdmin from './components/LogsAdmin.vue'
import LogsAdminUpdate from './components/LogsAdminUpdate.vue'
import LogsAdminAdd from './components/LogsAdminInsert.vue'
import IndexAdmin from './components/IndexAdmin.vue'
import ArticleAdminAdd from './components/ArticleAdminAdd.vue'
import ArticleAdminUpdate from './components/ArticleAdminUpdate.vue'
import StatisticsAdmin from './components/StatisticsAdmin.vue'
import Login from './components/Login.vue'

Vue.config.productionTip = false

Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource)
//将axios改写成Vue的原型属性
Vue.prototype.$ajax = axios;
//装echarts改写成Vue的原型属性
Vue.prototype.$echarts = echarts;

const router = new VueRouter({
  routes:[
    {path:'/',component:Index,
      children:[ //子路由
        {path:'/',component:Home},
        {path:'home',component:Home},
        {path:'article-list',component:ArticleList},
        {path:'article/:id',component:Article}
       ]},
    {path:'/login',component:Login},
    {path:'/admin',component:Admin,
      children:[
        {path:'/',component:IndexAdmin},
        {path:'articleAdmin',component:ArticleAdmin },
        {path:'logsAdmin',component:LogsAdmin},
        {path:'logsAdminAdd',component:LogsAdminAdd},
        {path:'logsAdminUpdate',component:LogsAdminUpdate},
        {path:'indexAdmin',component:IndexAdmin},
        {path:'articleAdminAdd',component:ArticleAdminAdd},
        {path:'articleAdminUpdate',component:ArticleAdminUpdate},
        {path:'statisticsAdmin',component:StatisticsAdmin}
      ]
    },



  ],
});

//路由跳转前判断是否已登录
router.beforeEach((to, from, next) => {

  if (to.path == '/login') {
    sessionStorage.removeItem('currentUser_name');
  }

  if(to.path.indexOf('admin') == -1){ //如果访问的不是后台管理则可以访问
    next();
  }else{
    let user = sessionStorage.getItem('currentUser_name');
    if (!user && to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }



})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//组件插入数据流的功能
  template: '<App/>',
  components: { App }
})
