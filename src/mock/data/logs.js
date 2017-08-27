/**
 * Created by Administrator on 2017/7/17.
 */
import Mock from 'mockjs';

//显示日志页面的文章
const ListLogs = [
  {
    id: 10,
    version: '4.0',
    content: '所有数据使用MockJS模拟',
    addDate: '2017-07-19 16:30:20'
  },
  {
    id: 10,
    version: '3.0',
    content: '所有数据与SpringBoot服务端进行交互',
    addDate: '2017-07-14 13:46:54'
  },
  {
    id: 9,
    version: '2.0',
    content: '修改登录和博客文章模块.使用Vuex实现数据流',
    addDate: '2017-07-05 14:43:15'
  },
  {
    id: 8,
    version: '1.0',
    content: '最新版本上线.',
    addDate: '2017-06-20 20:39:16'
  },
  {
    id: 7,
    version: '0.7',
    content: '新增登录后保存用户对象.保存发表文章的作者.重新设计前台文章列表页面.前台列表页面显示文章作者.发表文章可以不上传主题图片.修改推荐后首页无法正确显示',
    addDate: '2017-06-20 16:02:40'
  },
  {
    id: 6,
    version: '0.6',
    content: '新增后台管理登录功能',
    addDate: '2017-06-19 13:57:59'
  }
  ,
  {
    id: 5,
    version: '0.5',
    content: '增首页显示统计图表',
    addDate: '2017-06-17 06:55:58'
  },
  {
    id: 4,
    version: '0.4',
    content: '博客文章模块开发完毕.添加富文本编辑框.标题图片上传.推荐文章到首页',
    addDate: '2017-06-16 13:45:50'
  },
  {
    id: 3,
    version: '0.3',
    content: '完成开发历程模块.',
    addDate: '2017-06-14 23:42:12'
  },
  {
    id: 2,
    version: '0.2',
    content: 'element的博客后台搭建完毕.新增添加开发历程.新增首页显示开发历程.',
    addDate: '2017-06-10 19:01:07'
  }
  ,
  {
    id: 1,
    version: '0.1',
    content: '博客前台开发完毕',
    addDate: '2017-06-08 19:00:50'
  }
];

export { ListLogs };
