<!-- 更新日志 -->
<template>
  <div class="adminLog">
        <div >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>开发历程</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
     <div >
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
              <el-form-item>
                <el-input v-model="qContent" class="in_logo" placeholder="日志" ></el-input>
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
    <el-table ref="multipleTable" :data="logs" stripe border
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
        label="版本号"
        width="120"
        prop="version"
        sortable>
      </el-table-column>
      <el-table-column
        label="更新内容"
        prop="content"
        width="500">
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
  //导入第三方js,这里是处理日期时间格式
  import {makeDate} from '../../static/js/dateformat.js' //注意路径
  export default {
    data() {
      return {
        //查询的日志内容
        qContent:'',
        //查询起始日期
        startDate:'',
        //查询结束日期
        endDate:'',
        //需要显示的列表数据
        logs:[],
        //当前页码
        currentPage:1,
        //总页数
        total:0,
        //显示是否加载中提示
        loading:false,
        //多选时的选项
        multipleSelection:[]
      }
    },
    mounted:function(){
      this.query();
    },
    methods: {
      add(){
        this.$router.push('/admin/logsAdminAdd');
      },
      handleUpdate(id){
        this.$router.push({path:'/admin/logsAdminUpdate',query:{id:id}});

      },
      query(){
        //this.currentPage = 1; //重置当前页
        this.loading = true;
        this.$ajax.get('/listLogs',
          {params:{currentPage:this.currentPage,qContent:this.qContent,
            startDate:this.startDate,endDate:this.endDate}})
          .then(response=>{
          this.logs = response.data.data;
          this.total = response.data.totalCount;
          this.loading = false;
        })
      },
/*      fetchData(){
          this.loading = true;
          this.$ajax.get('/logsList',{params:{currentPage:this.currentPage}}).then(response=>{
              this.logs = response.data.logs;
              this.total = response.data.total;
              this.loading = false;
          })
      },*/
        //时间格式化
        dateFormat:function(row, column) {
          var date = row[column.property];
          if (date == undefined) {
            return "";
          }
          return makeDate(date);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.query();
        },
        handleDel(id){
          this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.$ajax.get('/delLogs',{params:{id:id}}).then((response)=>{
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.query();
            })
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
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(()=>{
            this.loading = true;
            this.$ajax.get('/delBatchLogs',{params:{ids:ids}}).then(response=>{
                this.loading = false;
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.query();
            });
          });
        }
      }



  }
</script>


<style>
  .adminLog{
    padding-top:20px;
  }

  .adminLog .in_logo{
    width:300px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 20px;
    border:1px solid #dfe6ec;
    margin: 10px 0px;

  }

  .pagebar{
    background: #f2f2f2;
    margin-top:5px;
    padding:10px;
    border:1px solid #dfe6ec;
  }

</style>
