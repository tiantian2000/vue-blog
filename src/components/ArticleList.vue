<!-- 文章列表页面 -->
<template>
  <div class="articlelist">
  <div id="banner">
    <div class="inner">
      <h1>天天</h1>
      <!--<p class="info">85关注 | 400粉丝 | 18文章 | 816喜欢</p>-->
      <p style="padding-top: 10px;">尘事如潮人如水，只叹江湖几人回</p>
    </div>
  </div>
    <div class="list">
      <!--wz-->
      <div class="wz" v-for="item in articles">
        <h3><a href="javascript:void(0)" @click="showArticle(item.id)">{{item.title}}</a></h3>
        <dl>
          <dt><img v-show="item.photo"  :src="item.photo" width="200"  height="132" alt=""
                   @click="showArticle(item.id)">
            <img v-show="item.photo==''" src="../assets/nophoto.jpg" width="200"  height="132" alt="">
          </dt>
          <dd>
            <p class="dd_text_1">{{item.subTitle}}</p>
            <p class="dd_text_2">
              <span class="yd">浏览:{{item.browse}}</span>
              <span class="author">{{item.users.name}}</span>
              <!--<span class="sj">编辑:{{item.addDate|formatDate}}</span>-->
              <span class="sj">编辑:{{item.addDate}}</span>
              <span class="fl">分类:{{item.type}}</span>

              <div class="clear"></div>
            </p>
          </dd>
          <div class="clear line"></div>
        </dl>
      </div>
      <!--wz end-->


    </div>
    <div class="more" v-if="loadMoreShow"><button @click="fetchMore">更多</button></div>
  </div>
</template>
<script>
  //导入第三方js,这里是处理日期时间格式
  import {makeDate} from '../../static/js/dateformat.js' //注意路径
  export default{
      data(){
          return{
            page:1,
            articles:[],
            loadMoreShow:false
          }
      },
      mounted:function(){
          this.fetchData();

      },
      methods:{
          fetchData:function(){
              this.$ajax.get('/listArtiles',{ page: this.page }).then(response=>{
                  this.articles = this.articles.concat(response.data.articles);
                  if(response.data.hasNext){
                      this.loadMoreShow = true;
                  }else{
                      this.loadMoreShow = false;
                  }
              });
          },
          showArticle:function(id){ //显示
              //this.$ajax.get('/updateBrowse',{params:{id:id}}).then(response=>{
              this.$router.push('/article/'+id);
              //})
          },
          fetchMore:function(){
              this.page = this.page+1;
              this.fetchData();
          }
      },
      filters:{ //过滤器
        formatDate:function(value){ //定义转换日期
          return makeDate(value);
        }
      }

  }
</script>
<style>

  .articlelist *{
    margin:0;
    padding:0;
  }

  .articlelist #banner{
    height:450px;

  }

  .articlelist #banner .inner .info{
    color: #787878;
    font-size:1em;
  }

  .articlelist ul{
    margin:0;

  }

  .articlelist .list{
    width:100%;
    background-color: #fbfbfb;
  }


  .articlelist .wz{

    padding:10px 0 0 200px;

  }
  /*文章*/
  .articlelist .wz dl {
    width: 930px;
    margin-top: 3px;
  }
  .articlelist .wz h3{width:520px;height:30px;overflow:hidden;line-height:30px;
    font-size:20px;font-weight:bold;padding-left:5px;color: #4f4f4f;margin-bottom:10px;}
  .articlelist .wz h3 a{color:#4f4f4f;}
  .articlelist .wz h3:hover{padding-left:20px; transition: all 0.5s;-webkit-transition: all 0.5s; -moz-transition: all 0.5s; -o-transition: all 0.5s;}

  .articlelist .wz dl dt{float:left;width:204px;height:137px;margin-left:5px;display:block;border:1px solid #ccc;}
  .articlelist .wz dl dt img{padding:2px;}
  .articlelist .wz dl dd{float:left;width:705px;overflow:hidden;margin-left:10px;}
  .articlelist .wz dl dd .dd_text_1{height:80px; display:block;overflow:hidden;color:#666}
  .articlelist .wz dl dd .dd_text_2{
    line-height:71px;
    font-size:14px;
    color:#a3a3a3;
  }

  .articlelist .wz dl dd .dd_text_2 span{padding-left:15px;}
  .articlelist .wz dl dd .dd_text_2 .author{display:inline-block;width:60px;height:60px;
    background:url("../../static/img/tx.jpg") 5px 27px no-repeat;
    padding-left:25px;
    margin-left:20px;}
  .articlelist .wz dl dd .dd_text_2 .sj{display:inline-block;width:200px;height:60px;
    background:url("../../static/img/sj.jpg") 5px 27px no-repeat;padding-left:25px;}
  .articlelist .wz dl dd .dd_text_2 .fl{display:inline-block;width:150px;heigt:60px;text-align:center;}
  .articlelist .wz dl dd .dd_text_2 .fl a{color:#1D1718;}
  .articlelist .wz dl dd .dd_text_2 .yd{display:inline-block;width:110px;height:30px;text-align:center;margin-top:3px;}
  .articlelist .wz dl dd .dd_text_2 .yd a{color:#F55522;display:block;width:80px;height:22px;line-height:22px;
    text-align:center;padddding:2px 5px;border:1px solid #AC9696;border-radius:2px;}
  .articlelist .wz dl dd .dd_text_2 .yd a:hover{color:#f36;}
  .articlelist .clear{clear:both;}
  .articlelist a{text-decoration:none;}
  .articlelist .wz .line{
    padding:20px 0 0 0;
    border-bottom: 1px dotted #313131;

  }

  .articlelist .more{
    background-color: #fbfbfb;
    text-align: center;
    padding:10px;
  }
  .articlelist .more button{
    padding:5px;
    border:1px solid #bebebe;
    background-color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    color: #ff8e97;
  }
  /*left end*/

  /*.list .article{
    width:65%;
    float:left;
  }

  .list .wrap-img{
    width:35%;
    float:right;
    padding-top:10px;
  }

  .articlelist figure{

    display: inline-block;
    margin:0;
    padding:30px 0 30px 220px;
    border-bottom: 1px solid #eee;
  }

  .articlelist figure .subinfo{
    padding-top:8px;
    color: #a3a3a3;
    font-size: 0.9em;
  }

  .articlelist figure .abstract{
    line-height: 2;
  }

  .articlelist figure .article .title{
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: #777777;
  }

  .articlelist figcaption .meta a{
    text-decoration: none;
    color: #787878;
    font-size: 0.8em;
    padding:1px;
  }

  .articlelist figcaption .meta .view{
    color: #787878;
    font-size: 0.8em;
    padding:1px;
  }

  .articlelist .more{
    background-color: #fbfbfb;
    text-align: center;
    padding:10px;
  }

  .articlelist .more button{
    background-color: #fff;
    color: #595959;
    border:1px solid #dce0ff;
  }*/
</style>
