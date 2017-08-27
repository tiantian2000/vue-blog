<template>
  <div class="adminLogAdd">
    <div >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/admin/logsAdmin'}">开发历程</el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="logform">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="版本号" prop="version">
        <el-input v-model="form.version"></el-input>
      </el-form-item>
      <el-form-item label="更新内容" prop="content">
        <el-input type="textarea" :rows="10" :cols="80" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          version:'',
          content: ''
        },
        rules: {
          version:[{required: true, message: '请输入版本号', trigger: 'blur'}] ,
          content: [{required: true, message: '请输入更新内容', trigger: 'blur'}]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/addLogs',this.form).then(response=>{
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
  .adminLogAdd{
    padding-top:20px;
  }

  .adminLogAdd .logform{
    padding:20px;
  }
</style>
