/**
 * Created by Administrator on 2017/7/17.
 */
import axios from 'axios';
import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';
//导入第三方js,这里是处理日期时间格式
import {makeDate} from '../../static/js/dateformat.js'
import { ListArticles,StatisticsArticles } from './data/article';
import { LoginUsers } from './data/users';
import { ListLogs } from './data/logs';

let _ListArticles = ListArticles;
let _ListLogs = ListLogs;
//每页显示日志记录数
const PerLogsPage = 7;

export default {
  bootstrap(){
    // 设置模拟调试器实例
    var mock = new MockAdapter(axios);

    //首页文章数据
    mock.onGet('/index').reply(config=>{
      //取推荐
      let mockArticles = _ListArticles.filter(article => {
        if (article.status == 1) return false;
        return true;
      });

      //取三条数据
      mockArticles = mockArticles.filter((article,index) => index<3 && index>=0);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            articles: mockArticles
          }]);
        }, 500);
      });
    });

    //列表页文章数据
    mock.onGet('/listArtiles').reply(config=>{
      let page = config.page;
      console.log(page);
      //这里总记录数设定查询20条
      //如果page<=4则hasNext为true
      let hasNext;
      if(page<4) hasNext = true;
      else hasNext = false;
      //按页数记录显示
      let showArticles = _ListArticles.filter((u, index) => index < 5 * page && index >= 5 * (page - 1));
      return new Promise((resolve, reject) => {
          setTimeout(() => {
          resolve([200, {
            articles:showArticles,
            hasNext:hasNext
          }]);
        }, 1000);
      });
    })

    //加载文章
    mock.onGet('/getArticle').reply(config=>{
      let id = config.id
      //过滤ID相同的文章存到新的数组中
      let mockArticles = _ListArticles.filter(article => {
        if (article.id!=id) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            article:mockArticles[0],
          }]);
        }, 500);
      });

    })

    //更新浏览次数
    mock.onGet('/updateBrowse').reply(config=>{
      let id = config.id
      _ListArticles.some(article=>{
        if(article.id == id){
          article.browse ++;
          return true;
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '更新成功'
          }]);
        }, 500);
      })
    })

    //登录
    mock.onPost('/login').reply(config=>{
      let users = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            //比较提交的参数和json数组中是否有一致的
            if (u.username == users.username && u.password == users.password) {
              return true;
            }
          });

          if (hasUser) {
            console.log('登录成功...')
            resolve([200,  1 ]);
          } else {
            console.log('登录失败')
            resolve([200,-1]);
          }
        }, 1000)
      })
    })

    //文章统计
    mock.onGet('/statisticsArticles').reply(200,StatisticsArticles)

    //取所有日志
    mock.onGet('/allLogs').reply(200,ListLogs);

    //分页取日志
    mock.onGet('/listLogs').reply(config=>{
        let {currentPage,qContent,startDate,endDate} = config.params;
        let total = _ListLogs.length
        //按条件检索
        let mockLogs = _ListLogs.filter(log=>{
          if(qContent && log.content.indexOf(qContent) == -1) return false;
          if(startDate && log.addDate < makeDate(startDate)) return false;
          if(endDate && log.addDate > makeDate(endDate)) return false;
          return true;
        })
        mockLogs = mockLogs.filter((logs,index)=>
          index < PerLogsPage * currentPage && index >= PerLogsPage * (currentPage-1))
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              totalCount: total,
              data: mockLogs
            }]);
          }, 1000);
         });
      }
    )

    //新增日志
    mock.onPost('/addLogs').reply(config=>{
      let logs = JSON.parse(config.data)
      logs.addDate = Mock.Random.now()
      //把新增的元素添加到数组的首位
      _ListLogs.unshift(logs)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    })

    //删除日志
    mock.onGet('/delLogs').reply(config=>{
      let {id} = config.params;
      //删除查找到的元素
      _ListLogs.some((log,index)=>{
        if(log.id == id){
          _ListLogs.splice(index,1)
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    })

    //批量删除
    mock.onGet('/delBatchLogs').reply(config=>{
      let {ids} = config.params;
      _ListLogs.some((log,index)=>{
        //如果找到需要删除的id,则从数组中删除
        if(ids.includes(log.id) != -1){
          _ListLogs.splice(index,1)
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    })


    //加载日志
    mock.onGet('/findLogs').reply(config=>{
      let{id} = config.params;
      let resultLog
      _ListLogs.some(log=>{
        if(log.id == id){
          resultLog = log
          return true;
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            log: resultLog,
          }]);
        }, 500);
      });
    })

    //更新日志
    mock.onPost('/updateLogs').reply(config=>{
      let log = JSON.parse(config.data)
      console.log(log)

      _ListLogs.some(l=>{ //查找到需要更新的元素后更新
        if(log.id == l.id){
          l.version = log.version
          l.content = log.content
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '更新成功'
          }]);
        }, 500);
      });
    })


    //分页取文章
    mock.onGet('/listArticles').reply(config=>{
        let {currentPage,qTitle,qType,startDate,endDate} = config.params;
        console.log(qTitle+qType);
        let total = _ListArticles.length
        //按条件检索
        let mockArticles = _ListArticles.filter(article=>{
          if(qTitle && article.title.indexOf(qTitle) == -1) return false;
          if(qType && article.type != qType) return false;
          if(startDate && article.addDate < makeDate(startDate)) return false;
          if(endDate && article.addDate > makeDate(endDate)) return false;
          return true;
        })
        mockArticles = mockArticles.filter((logs,index)=>
        index < PerLogsPage * currentPage && index >= PerLogsPage * (currentPage-1))
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              totalCount: total,
              data: mockArticles
            }]);
          }, 1000);
        });
      }
    )

    //新增文章
    mock.onPost('/addArticle').reply(config=> {
      let article = JSON.parse(config.data)

      let _article = {
        id: Mock.Random.id(),   //随机生成id
        title: article.title,
        subTitle: article.subTitle,
        browse:'0',
        addDate:Mock.Random.now(),
        photo: Mock.Random.image('720x300','#ea5909', '文章') , //随机生成图片的url地址
        type:article.type,
        users:{
          name:article.author
        },
        content:Mock.Random.cparagraph(100,300),//生成文章内容
        status:'1'
      }

      _ListArticles.unshift(_article);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      })
    })

    //推荐文章
    mock.onPost('/recommendArticle').reply(config=>{
      let {id,status} = JSON.parse(config.data);
      _ListArticles.some(article=>{
        if(article.id==id){
          article.status = status
          article.recommendDate = Mock.Random.now()
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '推荐成功'
          }]);
        }, 500);
      })

    })

    //删除文章
    mock.onGet('/delArticle').reply(config=>{
      let {id} = config.params;
      //删除查找到的元素
      _ListArticles.some((article,index)=>{
        if(article.id == id){
          _ListArticles.splice(index,1)
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    })

    //批量删除
    mock.onGet('/delBatchArticles').reply(config=>{
      let {ids} = config.params;
      _ListArticles.some((article,index)=>{
        //如果找到需要删除的id,则从数组中删除
        if(ids.includes(_ListArticles.id) != -1){
          _ListArticles.splice(index,1)
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    })

    //加载文章
    mock.onGet('/findArticle').reply(config=>{
      let{id} = config.params;
      let resultArticle
      _ListArticles.some(article=>{
        if(article.id == id){
          resultArticle = article
          return true;
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,resultArticle]);
        }, 500);
      });
    })

    //更新文章
    mock.onPost('/updateArticle').reply(config=>{
      let article = JSON.parse(config.data)
      _ListArticles.some(a=>{ //查找到需要更新的元素后更新
        if(article.id == a.id){
          a.title = article.title
          a.subTitle = article.subTitle
          a.type = article.type
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '更新成功'
          }]);
        }, 500);
      });
    })
  }


}

