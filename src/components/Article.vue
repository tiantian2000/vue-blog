<!-- 文章详细页面 -->
<template>
  <div class="article">
      <div id="bannera">
        <div class="inner">
          <figure>
            <figcaption>{{article.title}}</figcaption>
            <p class="article-title">作者:{{article.users.name}} | 类别:{{article.type}}</p>
            <!--<img v-show="article.photo" :src="'../../static/upload/'+article.photo" width="300" height="200"/>-->
          </figure>
        </div>
      </div><div class="content">
      <div class="content-wrapper">
        <div class="article-info">编辑于<!--{{article.addDate | formatDate}}-->
          {{article.addDate}}
           | 浏览: {{article.browse}}</div>
        <article>
          <div v-html="article.content"></div>
        </article>
      </div>

      </div>
</div>
</template>
<script>

  //导入第三方js,这里是处理日期时间格式
  import {makeDate} from '../../static/js/dateformat.js' //注意路径

  export default{
    data(){
        return{
            id:'',
            article:''
        }
    },
    created(){
      this.menu();
      this.fetchData();
    },
    methods: {
      menu() { //让页面从顶部显示
        window.scrollTo(0,0);
      },
      fetchData:function(){ //获取数据
          this.id = this.$route.params.id;
          this.$ajax.get('/updateBrowse',{id:this.id}).
          then(response=>{//更新浏览次数
            this.$ajax.get('/getArticle',{ id: this.id }).then(response=>{
                this.article = response.data.article;
                console.log(this.article)

            });
          });

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
  .article #bannera{
    height:500px;
    background: rgba(0,0,0,0.1);
    color: #fff;
  }

  .article #bannera figure{
    /*border-top:1px solid #fff;*/
    border-bottom: 1px solid #fff;
    margin:0;
    padding:10px;
    position: relative;
    top:140px;
    font-size: 40px;
    font-weight: bold;
  }

  .article #bannera figcaption{
    padding-bottom:10px;
  }
  .article #bannera .inner{
    width:500px;
    text-align: center;
    margin: 0 auto;

  }

  .article #bannera .inner p{
    /*line-height: 30px;*/
  }

  .article figure{
    margin:0;
    padding:0;
  }

  .article .content{
    background-color: #fbfbfb;
  }

  .article .content article{
    line-height: 2em;
    text-indent: 2em;
    padding-bottom:5px;
  }

  .article  .article-info{
    font-size:15px;
    color:#888;
    padding:15px 0;
  }

  .article .article-title{
    font-size:15px;
    color: #b7b7b7;
    padding:15px 0;
  }

</style>
