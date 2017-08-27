/**
 * Created by Administrator on 2017/6/28.
 */
//导入常量定义
import * as types from './mutations-type'
import axios from 'axios'

export default{
  //新增文章
  [types.ADD_ARTICLE](state,article){
    console.log('新增成功')
  },
  //修改文章
  [types.UPDATE_ARTICLE](state,article){
    console.log('修改成功')
  },
  //删除文章
  [types.DEL_ARTICLE](state,id){
    axios.get('/delArticle',{params:{id:id}}).then((response)=>{
    })
  },
  //批量删除文章
  [types.BATCH_DEL_ARTICLE](state,ids){
    axios.get('/delBatchArticles',{params:{ids:ids}}).then((response)=>{
    })
  },
  //列表文章
  [types.LIST_ARTICLE](state,data){
    state.loading = true;
    axios.get('listArticles',
      {params:data})
      .then(response=>{
        state.articles = response.data.data;
        state.total = response.data.totalCount;
        state.loading = false;
      })
    console.log('查询成功'+state.articles)
  },
  //推荐文章
  [types.RECOMMEND_ARTICLE](state,data){
    axios.post('/recommendArticle',data).then(response=>{
      //把状态设置成一个随机数
      state.status = new Date().getTime();
    })
  },
  //设置当前页码
  [types.SET_CURRENT_PAGE](state,val){
    state.currentPage = val
  },
  //登录
  [types.LOGIN](state,data){
    axios.post('/login',data).then(response=>{
      if(response.data==-1){ //登录失败
        //console.log('登录失败')
        state.isLogin = true;
        state.logining = false;
      }else{ //登录成功
        console.log('登录成功')
        state.isLogin = false;
      }

    })
  },
  //设置是否显示正在登录提示
  [types.SET_LOGINING](state,flag){
    state.logining = flag
  },
  //设置是否登录
  [types.SET_ISLOGIN](state,flag){
    state.isLogin = flag
  }


}
