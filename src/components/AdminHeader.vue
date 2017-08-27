<!--后台管理页面-->
<template>
  <div class="home">
    <div>

      <header class="head-nav">
        <el-row>

          <el-col :span="4">
            <div class="logo-title">
              <h1>Vue2.0博客管理系统</h1>
            </div>
          </el-col>
          <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">
                  <img src="../assets/pic01.jpg" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </header>



    </div>

  </div>
</template>

<script>
  export default {
    methods:{
      index:function(){ //首页
          this.$router.push('/admin');
      },
      logout:function(){ //退出
          this.$router.push('/');
      }
    }
  }
</script>

<style>

  .head-nav .logo-title{
    width:400px;
    padding-left: 30px;
    letter-spacing: 1px;
  }

  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    ling-height:50px;
  }
  .userinfo .userinfo-inner {
    cursor: pointer;
    color: #fff;
  }
  .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 18px 0px 10px 10px;

  }



  .logo {
    height: 50px;
    width: auto;
    margin-left: 30px;
    margin-top: 15px;

  }


  .fa-user {
    position: relative;
    top: -2px;
    margin-right: 4px;
  }

  .head-nav {
    width: 100%;
    height: 80px;
    background: #2f80ba;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    color: #FFF;
    border-bottom: 1px solid #1F2D3D;
  }

  .logout {
    width: 60px;
    height: 60px;
    line-height: 80px;
    text-align: center;
    float: right;
    cursor: pointer;
    padding:0 40px 0 20px;
  }


</style>
