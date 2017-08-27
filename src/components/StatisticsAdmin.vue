/**
 * Created by Administrator on 2017/6/16.
 */
<template>
  <div class="statistics">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="柱状图" name="first">
        <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="second">
        <div id="myPieChart" :style="{width: '800px', height: '600px'}"></div>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>
<script>
  export default{
    data(){
      return{
          activeName2: 'first',
          result:[],
          type:[],
          num:[],
          title:[],
          nums:[]
      }
    } ,
    mounted(){
      this.drawLine(); //柱状图
      this.drawPie();  //饼图
    },
    methods: {
      handleClick(tab, event) {
      },
      drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          this.drawLineChart(myChart);
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
      drawLineChart(myChart) {

        //指定图表配置项和数据
        var option = {
          //标题
          title : {
            text : '博客文章统计',
            subtext : '想学IT就跟着我吧',
            left : 150,//距离左边的像素值
            borderColor : 'red',
            borderWidth : 5

          },
          tooltip:{
            trigger:'axis'
          },
          grid:{
            y2:140 //grid的调整,根据具体的需要调整,有时不调整也会显示不全
          },
          //工具箱
          toolbox : {
            show : true,
            feature : {
              saveAsImage : {
                show : true
              },
              dataView : {
                show : true
              },
              restore : {
                show : true
              },
              dataZoom : {
                show : true
              },
              magicType : {
                type : [ 'bar','line' ]
              }
            }
          },
          //图例
          legend : {
            data : [ '数量' ]
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
      },
      drawPie(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myPieChart'));
        this.drawPieChart(myChart);
        myChart.showLoading();// 加载动画
        this.$ajax.get('/statisticsArticles').then(response=>{
          this.result = response.data;
          this.result.forEach((item,index)=>{
            var map = {};
            map.name = item.type;
            map.value = item.num;
            this.title.push(item.type);
            this.nums.push(map);
          });
          console.log(this.nums);
          myChart.hideLoading();
          // 填入数据
          myChart.setOption({
            legend: {
              data: this.title
            },
            series:[{
              // 根据名字对应到相应的系列
              name: '数量',
              type: 'pie',
              data:  this.nums

            }],
          })
        });
      },
      drawPieChart(myChart){
        var option = {
          //标题
          title:{
            text: '博客文章统计',
            subtext:'想吃饭就跟着我吧',
            left:150,//距离左边的像素值
            borderColor:'red',
            borderWidth:5

          },
          //图例
          legend:{
            orient:'vertical',
            left:'left',
            data:[]
          },

          //数据
          series:[{
            name:'数量',
            type:'pie',//饼图图
            radius:'55%',//半径
            center:['50%','60%'],//位置
            data:[],
            itemStyle:{
              normal:{
                label:{
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine :{show:true}
              }
            }
          }]
        };
        myChart.setOption(option);
      }
    }
  }
</script>
<style>
  .statistics{
    padding-top:20px;
  }
</style>
