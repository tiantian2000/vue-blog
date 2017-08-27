<!-- 首页 -->
<template>
  <div>
    <div id="banner">
      <div class="inner">
        <h1>天天</h1>
        <p>天下风云出我辈，一入江湖岁月催</p>
        <p>尘事如潮人如水，只叹江湖几人回</p>
        <button>了解我</button>
        <div class="more">
          <i class="fa fa-chevron-down fa-2x"></i>
          <p>更多</p>
        </div>
      </div>
    </div>
    <div class="content">
      <section class="header-section">
        <div class="wrapper">
          <h2>人生在展望</h2>
          <div class="hr"></div>
          <p class="subheading">人生没有最好，心想何必太高，自信自己能行，奋斗就会崛起</p>
        </div>
        <div class="icon-group">
          <span class="icon"><i class="fa fa-cloud fa-2x"></i></span>
          <span class="icon"><i class="fa fa-mortar-board fa-2x"></i></span>
          <span class="icon"><i class="fa fa-heart-o fa-2x"></i></span>
        </div>
      </section>
      <section class="content-section">
        <!-- 循环遍历-->
        <div class="article-preview" v-for="(article,index) in articles">

          <!--如果是奇数行则图片在左,文字在右-->
          <div class="per-article" v-if="index%2==0">
            <div class="img-section">
              <a href="javascript:void(0)" @click="showArticle(article.id)">
                <img v-show="article.photo" :src="article.photo" width="640" height="360"></a>
                <img v-show="article.photo==''" src="../assets/nophoto.jpg" >
            </div>
            <div class="text-section">
              <h2><a href="javascript:void(0)" @click="showArticle(article.id)">{{article.title}}</a></h2>
              <p>{{article.subTitle}}</p>
            </div>
          </div>
          <!--如果是偶数行则文字在左,图片在右-->
          <div class="per-article" v-if="index%2!=0">
            <div class="text-section">
              <h2><a href="javascript:void(0)" @click="showArticle(article.id)">{{article.title}}</a></h2>
              <p>{{article.subTitle}}</p>
            </div>
          <div class="img-section">
            <a href="javascript:void(0)" @click="showArticle(article.id)">
              <img v-show="article.photo" :src="article.photo" width="640" height="360"></a>
              <img v-show="article.photo==''" src="../assets/nophoto.jpg" >
          </div>

        </div>
        </div>


      </section>

    </div>
</div>
</template>
<script>
  export default{
    data(){
        return{
          articles:[]
        }
    } ,
    mounted:function(){
      this.fetchData();
    },
    methods:{
      fetchData:function(){//获取数据

/*        this.$ajax.get('/indexArticle').then(response=>{
            this.articles = response.data.articles;
            console.log(this.articles)
        })*/
        //访问express服务器获取数据
/*        this.$ajax.get('http://localhost:3000/index')
          .then(response=>{
              this.articles =response.data.articles
              console.log(this.articles)
        })*/
        //直接访问springboot
/*        this.$ajax.get('http://localhost:9090/blog/index')
          .then(response=>{
            this.articles =response.data
            console.log(response.data);
          })*/
        //测试跨域访问1
        /*this.$ajax.post('http://localhost:3000/users/demo1',{id:'1',title:'测试标题'})
          .then(response=>{
            console.log('成功访问')
            console.log(response.data.title);
          })*/
        //访问mock数据
        this.$ajax.get("/index").then(res=>{
            console.log(res.data.articles)
            this.articles =res.data.articles
        }
        );
      },
      showArticle:function(id){ //显示文章
          //this.$ajax.get('http://localhost:3000/updateBrowse',{params:{id:id}}).then(response=>{
            this.$router.push('/article/'+id);
          //})

      }
    }
  }
</script>
<style>

</style>
