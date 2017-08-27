/**
 * Created by Administrator on 2017/6/28.
 */
import Vue from 'vue'
//vuex是vue第三方插件 周边生态 数据流
//将Vuex的逻辑全部在index.js中实现
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
Vue.use(Vuex);

//状态集合,全局管理的引起界面状态改变的值
const state = {
  qContent:'',       //查询日志内容
  currentPage:1,     //当前页码
  total:0,           //总页数
  loading:false,    //显示是否加载中提示
  articles:[],      //需要显示的文章列表数据
  isLogin:'',       //显示登录错误提示
  logining:false,   //显示正在登录提示
  status:''         //显示推荐状态
}

//创建一个Vuex的Store实例
export default new Vuex.Store({
  state, //状态
  mutations,//改变
  getters,
  actions   //动作,组件不能直接改变state
})
