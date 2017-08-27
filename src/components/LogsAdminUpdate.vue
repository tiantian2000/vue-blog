<template>
  <div class="adminLogUpdate">
    <div >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/admin/logsAdmin'}">开发历程</el-breadcrumb-item>
        <el-breadcrumb-item>修改</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="logform">
        <el-form ref="form" :model="log" :rules="rules" label-width="80px">
          <el-form-item label="版本号" prop="version">
            <el-input v-model="log.version"></el-input>
          </el-form-item>
          <el-form-item label="更新内容" prop="content">
            <el-input type="textarea" :rows="10" :cols="80" v-model="log.content"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
          log:{
              version:'',
              content:''
          },
          rules: {
            version:[{required: true, message: '请输入版本号', trigger: 'blur'}] ,
            content: [{required: true, message: '请输入更新内容', trigger: 'blur'}]
          }
        }
    },
    mounted:function(){
        this.fetchData(this.$route.query.id);
    },
    methods:{
        fetchData:function(id){
          this.$ajax.get('/findLogs',{params:{id:id}}).then(response=>{
             this.log = response.data.log;
          })
        },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/updateLogs',this.log).then(response=>{
              this.$message({
                message: '提交成功',
                type: 'success'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style>
  .adminLogUpdate{
    padding-top:20px;
  }


  .adminLogUpdate .logform{
    padding:20px;
  }
</style>
