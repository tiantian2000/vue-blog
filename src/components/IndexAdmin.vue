<!-- 后台首页 -->
<template>
  <div class="adminIndex">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light" >
          <div class="page-changelog content">

            <div class="heading">
              <el-button
                type="success"
              >开发历程</el-button>
            </div>
            <ul class="timeline">
              <li v-for="log in logs">
                <h3>{{log.version}}</h3>
                <p>
                  <em>{{log.addDate | formatDate }}</em>
                </p>
                <ul>
                  <li v-for="item in log.content.split('.')">{{item}}</li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </el-col>

  <el-col :span="15"><div class="grid-content bg-purple-light">
    <div class="grid-content bg-purple">
    <div id="myChart" :style="{width: '600px', height: '500px'}">
    </div>
  </div></div></el-col>
<!--    <el-col :span="10" >
        &nbsp;
      </el-col>-->
    </el-row>

  </div>
</template>

<script>
  //导入第三方js,这里是处理日期时间格式
  import {makeSimpleDate} from '../../static/js/dateformat.js' //注意路径
  export default {
    data(){
        return {
          logs:[],
          activeNames: ['1','2','3','4'],
          //统计结果
          result:[],
          //类别
          type:[],
          //数量
          num:[]
        }
    },
    mounted(){
        this.fetchData();
        this.drawLine();
    },
    methods:{
        fetchData:function(){
            this.$ajax.get('/allLogs').then(response=>{
                //console.log(response);
                this.logs = response.data;
            })
        },
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        this.drawChart(myChart);
        myChart.showLoading();// 加载动画
        this.$ajax.get('/statisticsArticles').then(response=>{
          this.result = response.data;
          this.result.forEach((item,index)=>{
            //console.log(item.type);
            this.type.push(item.type);
            this.num.push(item.num);
          });

          myChart.hideLoading();
          // 填入数据
          myChart.setOption({
            xAxis: {
              data: this.type
            },
            series: [{
              name: '销量',
              data: this.num
            }]
          });

        });



      },
      drawChart(myChart) {

        //指定图表配置项和数据
        var option = {
          //标题
          title : {
            text : '博客文章统计',
            subtext : '想学IT就跟着我吧',
            left : 150,//距离左边的像素值
            borderColor : '#58B7FF',
            borderWidth : 1

          },
          tooltip:{
            trigger:'axis'
          },
          grid:{
            y2:140 //grid的调整,根据具体的需要调整,有时不调整也会显示不全
          },


          //x轴
          xAxis : {
            data : [],
            axisLabel:{
              interval:0,//全部显示x轴
              rotate:-30//-30度倾斜显示
            }
          },
          //y轴
          yAxis : {},
          //数据
          series : {
            name : '数量',
            type : 'bar',//柱状图
            data : []
          },
        };
        myChart.setOption(option);
      }
    },
    filters:{ //过滤器
      formatDate:function(value){ //定义转换日期
        return makeSimpleDate(value);
      }
    }

  }
</script>

<style>
  .adminIndex{
    margin:20px 0 0 150px;
  }

  .adminIndex .header{
    margin-bottom: 20px;
  }

  .page-changelog{padding-bottom:100px}.page-changelog .fr{float:right;padding:0}
  .page-changelog .fr a{display:block;padding:10px 15px;color:#475669}
  .page-changelog .fr:hover a{color:#20a0ff}
  .page-changelog .heading{margin-bottom:20px}
  .page-changelog .timeline{margin:0 0 0 105px;padding-left:25px;position:relative;color:#5e6d82}
  .page-changelog .timeline>li{list-style:none;position:relative;line-height:1.8}
  .page-changelog .timeline>li:not(:last-child){margin-bottom:50px}
  .page-changelog .timeline>li:first-child{margin-top:-10px}
  .page-changelog .timeline>li:first-child h3:before{left:-33px;top:10px;width:17px;height:17px;background-color:#20a0ff;border:0}.page-changelog .timeline ul{padding-left:0}
  .page-changelog .timeline ul ul{padding-left:20px}
  .page-changelog .timeline ul ul li:before{content:"";width:4px;height:4px;border-radius:50%;background-color:#fff;border:1px solid #5e6d82;margin-right:5px;display:inline-block;vertical-align:middle}
  .page-changelog .timeline li li{font-size:14px;list-style:none;padding-left:0;word-break:break-all}
  .page-changelog .timeline li li:before{content:"";width:4px;height:4px;border-radius:50%;background-color:#5e6d82;margin-right:5px;display:inline-block;vertical-align:middle}
  .page-changelog .timeline h3{margin:0 0 10px}
  .page-changelog .timeline h3 a{opacity:1;float:none;margin-left:0;color:inherit}
  .page-changelog .timeline h3:before{content:"";display:block;position:absolute;left:-31px;top:13px;width:13px;height:13px;border-radius:50%;background-color:transparent;border:2px solid #20a0ff;box-sizing:border-box;background-color:#fff}
  .page-changelog .timeline h4{margin:50px 0 10px}
  .page-changelog .timeline p{margin:0}
  .page-changelog .timeline em{position:absolute;left:-127px;font-style:normal;top:6px;font-size:14px;color:#99a9bf}.page-changelog .timeline:before{content:"";width:1px;height:100%;position:absolute;left:0;top:10px;background-color:#eaeefa}
</style>
