<!-- 更新日志 -->
<template>
  <div class="adminArticle">
    <div >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>博客文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="qTitle" class="in_logo" placeholder="标题" ></el-input>
          </el-form-item>
          <el-form-item>
          <el-select v-model="qType"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>

          <el-form-item>
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="起始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="batchDel">批量删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <el-table ref="multipleTable" :data="articles" stripe border
              tooltip-effect="dark"
              v-loading="loading"
              element-loading-text="拼命加载中"
              @selection-change="handleSelectionChange"
              style="width:100%">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="标题"
        width="430"
        prop="title"
        >
      </el-table-column>
     <!-- <el-table-column
        label="副标题"
        width="330">
        <template scope="scope">
          {{ scope.row.sub_title | formatSubTitle}}
        </template>
      </el-table-column>-->
      <el-table-column
        label="类别"
        width="150"
        prop="type"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="推荐"
        width="80"
      >
        <template scope="scope">
              <el-tag type="danger">{{ scope.row.status=='0'?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="日期"
        :formatter="dateFormat"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            v-if="scope.row.status=='1'"
            size="small"
            type="info"
            @click="recommend(scope.row.id,'0')">推荐</el-button>
          <el-button
            v-if="scope.row.status=='0'"
            size="small"
            type="info"
            @click="recommend(scope.row.id,'1')">取消</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleUpdate(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDel(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--工具条-->
    <el-col :span="24" class="pagebar">
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="7" :total="total">

      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  //导入第三方js,这里是处理日期时间格式
  import {makeDate} from '../../static/js/dateformat.js' //注意路径
  export default {
    data() {
      return {
        //查询的日志内容
        qTitle:'',
        //查询起始日期
        startDate:'',
        //查询结束日期
        endDate:'',
        //查询类别
        qType:'',
        //需要显示的列表数据
        //articles:[],
        //当前页码
        //currentPage:1,
        //总页数
        //total:0,
        //显示是否加载中提示
        //loading:false,
        //多选时的选项
        multipleSelection:[],
//下拉框选项
        options: [{
          value: '',
          label: '请选择类别'
        },{
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
        ]
      }
    },
    watch:{ //监听到状态变化就重新获取文章列表
      status:function(val){
        //重新获取文章列表
        this.query();
      }
    },
    computed: {
      ...mapGetters({
      currentPage:'getCurrentPage',
      articles : 'getArticles',
      loading  : 'showLoading',
      total : 'getTotal',
      status:'getStatus'
    })}
    ,
    mounted:function(){
      this.query();
    },
    filters:{ //过滤器
      formatSubTitle:function(value){ //定义转换日期
        return value.slice(0,10);
      }
    },
    methods: {
      add(){
        this.$router.push('/admin/articleAdminAdd');
      },
      handleUpdate(id){
        this.$router.push({path:'/admin/articleAdminUpdate',query:{id:id}});
      },
      recommend(id,status){
          //推荐文章
          this.$store.dispatch('recommendArticle',{id:id,status:status})

      },
      query(){
        //console.log('重新获取')
        this.$store.dispatch('listArticle',{currentPage:this.currentPage,qTitle:this.qTitle,qType:this.qType,
          startDate:this.startDate,endDate:this.endDate});

      },
      //时间格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return makeDate(date);
      },
      handleCurrentChange(val) {
         //设置当前页码
         this.$store.dispatch('setCurrentPage',val)
        //重新获取文章列表
        this.$store.dispatch('listArticle',{currentPage:this.currentPage,qTitle:this.qTitle,qType:this.qType,
          startDate:this.startDate,endDate:this.endDate})

        //this.currentPage = val;
        //this.query();
      },
      handleDel(id){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
            this.$store.dispatch('delArticle',id)
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.query()
        })

      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        //console.log(val);
      },
      batchDel(){
        if(this.multipleSelection.length==0){
          this.$message({
            message: '请选择删除的记录',
            type: 'warning'
          });
          return;
        }
        //返回数组中的所有id构造新的数组
        var ids = this.multipleSelection.map(function(item){
          return item.id
        }).toString();
        console.log(ids);
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(()=>{
          this.$store.dispatch('batchDelArticle',ids)
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.query()
        });
      }
    }



  }
</script>


<style>
  .adminArticle{
    padding-top:20px;
  }

  .adminArticle .in_logo{
    width:180px;
  }

  .adminArticle .toolbar {
    background: #f2f2f2;
    padding: 20px;
    border:1px solid #dfe6ec;
    margin: 10px 0px;

  }

  .adminArticle .pagebar{
    background: #f2f2f2;
    margin-top:5px;
    padding:10px;
    border:1px solid #dfe6ec;
  }

</style>
