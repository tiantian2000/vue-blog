/**
 * Created by Administrator on 2017/6/28.
 */
import * as types from './mutations-type'

export default {
  //新增文章
  addArticle({commit},article){
    //提交
    commit(types.ADD_ARTICLE,article)
  },
  //修改文章
  updateArtile({commit},article){
    commit(types.UPDATE_ARTICLE,article)
  },
  //删除文章
  delArticle({commit},id){
    commit(types.DEL_ARTICLE,id)
  },
  //批量删除文章
  batchDelArticle({commit},ids){
    commit(types.BATCH_DEL_ARTICLE,ids)
  },
  //列表文章
  listArticle({commit},data){
    commit(types.LIST_ARTICLE,data)
  },
  //推荐文章
  recommendArticle({commit},data){
    commit(types.RECOMMEND_ARTICLE,data)
  },
  //设置当前页码
  setCurrentPage({commit},val){
    commit(types.SET_CURRENT_PAGE,val)
  },
  //登录
  login({commit},data){
        commit(types.LOGIN,data)
  },
  //设置是否显示正在登录提示
  setLogining({commit},flag){
    commit(types.SET_LOGINING,flag)
  },
  //设置是否登录
  setIsLogin({commit},flag){
    commit(types.SET_ISLOGIN,flag)
  }
}
