<!--后台管理页面-->
<template>
  <div class="admin">
    <admin-header></admin-header>
    <div class="left-fixed-right-auto">
      <main-menu></main-menu>
      <div class="right_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHeader from './AdminHeader.vue'
  import MainMenu from './AdminLeftMenu.vue'

  export default {
    name: 'app',
    components:{
      'admin-header':AdminHeader,
      'main-menu':MainMenu
    }
  }
</script>

<style>

  .left-fixed-right-auto {
    padding-top: 80px;
  }

  .admin .right_content {
    margin-left:200px;
    float: left;
    width:85%;
    box-sizing: border-box;

  }



</style>
