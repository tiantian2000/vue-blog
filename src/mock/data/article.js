/**
 * Created by Administrator on 2017/7/17.
 */
import Mock from 'mockjs';

var Random = Mock.Random;
Random.extend({
    constellation: function(date) {
    var constellations = ['诗与远方', 'IT·互联网', '心理', '谈谈情，说说爱', '散文', '旅行·在路上']
    return this.pick(constellations)
  }
})

//显示列表页面的文章
const ListArticles = [];

for(let i=0;i<20;i++){
  ListArticles.push(Mock.mock({
    id: Mock.Random.increment(),   //递增生成id
    title: Mock.Random.ctitle(),   //随机生成中文标题
    subTitle: Mock.Random.cparagraph(1,2),//随机生成1-2个句子的中文标题
    browse:Mock.Random.natural(0,100),
    addDate:Mock.Random.datetime(),
    photo: Mock.Random.image('720x300','#ea5909', '文章'+(i+1)) , //随机生成图片的url地址
    type:Mock.Random.constellation(),
    users:{
      name:Mock.Random.cname()
    },
    content:Mock.Random.cparagraph(100,300),//生成文章内容
    status:Mock.Random.natural(0,1), //是否推荐
    recommendDate:'' //推荐时间
  }))
}

//文章统计
const StatisticsArticles = [
  {
    type:'诗与远方',
    num:Mock.Random.natural(1,100)
  },
  {
    type:'IT·互联网',
    num:Mock.Random.natural(1,100)
  },
  {
    type:'心理',
    num:Mock.Random.natural(1,100)
  },
  {
    type:'谈谈情，说说爱',
    num:Mock.Random.natural(1,100)
  },
  {
    type:'散文',
    num:Mock.Random.natural(1,100)
  },
  {
    type:'旅行·在路上',
    num:Mock.Random.natural(1,100)
  },
]

export { ListArticles,StatisticsArticles };
