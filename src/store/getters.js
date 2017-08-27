/**
 * Created by Administrator on 2017/6/29.
 */
//从 store 中的 state 中派生出一些状态
// 取文章列表
export const getArticles = state=>state.articles
//取是否显示加载
export const showLoading = state=>state.loading
//取记录总数
export const getTotal = state=>state.total
//取当前页码
export const getCurrentPage = state=>state.currentPage
//取查询日志内容
export const getQueryContent = state=>state.qContent
//取显示登录错误提示
export const getIsLogin = state=>state.isLogin
//取显示正在登录提示
export const getLogining = state=>state.logining
//取推荐状态
export const getStatus = state=>state.status
