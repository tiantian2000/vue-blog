<!-- 博客文章 -->
<!-- 博客文章 -->
<template>
  <div class="note-editor">
    <div >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/admin/articleAdmin'}">博客文章</el-breadcrumb-item>
        <el-breadcrumb-item>修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="logform">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" ></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="sub_title">
          <el-input v-model="form.subTitle" ></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="form.type" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item >
        <el-form-item label="主题图片" >
          <el-upload
            name="photo"
            class="avatar-uploader"
            action="http://localhost:9090/blog/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="quill-editor-example">
          <!--<el-form-item label="内容" prop="version">-->
          <!-- quill-editor -->
          <quill-editor ref="myTextEditor"
                        v-model="form.content" >
          </quill-editor>
          <!--</el-form-item>-->
          <el-form-item style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>
<script>
  export default {
    data(){
      return {
        form:{
          title:'',
          subTitle:'',
          content:'',
          photo:'',
          type:''
        },
        //下拉框选项
        options: [{
          value: '诗与远方',
          label: '诗与远方'
        }, {
          value: 'IT·互联网',
          label: 'IT·互联网'
        }, {
          value: '心理',
          label: '心理'
        }, {
          value: '谈谈情，说说爱',
          label: '谈谈情，说说爱'
        }, {
          value: '散文',
          label: '散文'
        },{
          value:'旅行·在路上',
          label:'旅行·在路上'
        }
        ],
        imageUrl: '',
        rules: {
          title:[{required: true, message: '请输入标题', trigger: 'blur'}] ,
          subTitle: [{required: true, message: '请输入副标题', trigger: 'blur'}],
          type:[{required: true, message: '请选择类别', trigger: 'blur'}]
        }

      }
    }, mounted:function(){
      this.fetchData(this.$route.query.id);
    },
    methods:{
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/updateArticle',this.form).then(response=>{
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
      fetchData:function(id){
        this.$ajax.get('/findArticle',{params:{id:id}}).then(response=>{
          this.form = response.data;
          this.imageUrl = this.form.photo;
        })
      },
        handleAvatarSuccess(res, file) { //上传成功的回调方法
          this.imageUrl = res.ok;
          this.form.photo = res.ok;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }



  }
</script>

<style>

  .note-editor{
    padding-top:20px;
  }

  .ql-container .ql-editor {
    min-height: 22em;
    padding-bottom: 1em;
    max-height: 22em;
  }

  .logform{
    margin-top:20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>



<!--<template>
  <div class="note-editor">
    <p>{{title}}</p>
    <div v-html="content">

    </div>
  </div>

  </template>
  <script>
    export default {
      data(){
          return {
            title:'',
            content:''
          }
      },
      mounted:function(){
        this.fetchData();
      },
      methods:{
          fetchData(){
              console.log("fetch");
              this.$ajax.get('/articleGet',{params:{id:0}}).then(response=>{
                  this.title = response.data.article.title;
                  this.content = response.data.article.content;

              })
          }
      }

    }
  </script>

<style>

  .note-editor{
    padding-top:20px;
  }

  .ql-container .ql-editor {
    min-height: 22em;
    padding-bottom: 1em;
    max-height: 22em;
  }

  .logform{
    margin-top:20px;
  }

</style>-->
