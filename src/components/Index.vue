<template>
    <div>
      <div class="main-wrapper">
        <page-header></page-header>
        <router-view></router-view>
        <page-footer></page-footer>
      </div>
    </div>
</template>
<script>
  import PageHeader from './PageHeader.vue'
  import PageFooter from './PageFooter.vue'

  export default {
    name: 'app',
    components:{
      'page-header':PageHeader,
      'page-footer':PageFooter
    }
  }

</script>
<style>

</style>
