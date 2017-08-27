<template>
  <div class="left"  id='admin-left'>
    <div id='left-menu'>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
            <el-menu-item-group title="基本设置">
              <el-menu-item index="1" @click="logs"><i class="fa fa-book"></i>开发历程</el-menu-item>
              <el-menu-item index="2"><i class="fa fa-asterisk"></i>系统参数</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="信息管理">
              <el-menu-item index="3" @click="article"><i class="fa fa-list-alt"></i>博客文章</el-menu-item>
              <el-menu-item index="4" @click="statistics"><i class="fa fa-flag"></i>博客统计</el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      logs:function(){//开发日志
          this.$router.push('/admin/logsAdmin');
      },
      article:function(){//博客文章
          this.$router.push('/admin/articleAdmin')
      },
      statistics:function(){//博客统计
          this.$router.push('/admin/statisticsAdmin');
      }
    }
  }
</script>

<style>
  .fa {
    margin-right: 8px;
  }

  .left {
    position: fixed;
    float: left;
    width:190px;
    /*margin-right:-190px;*/
    top: 80px;
    height:100%;
  }

  #left-menu {
    height: 100%;
    background: #eceaff;
    position: relative;
    overflow-x: hidden;
  }





</style>
