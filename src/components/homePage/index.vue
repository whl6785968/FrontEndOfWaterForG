<template>
  <div class="homepage" >
    <div class="info_card">
      <el-row :gutter="35" style="margin-left: -20px;margin-right: -20px;">
        <el-col :span="6" :xs="12" :sm="12" :lg="6">
          <el-card class="box-card">
            <div class="card-panel">
              <i class="el-icon-share" style="color: #40c9c6;font-size: 48px;text-align: center;line-height: 10px;"></i>
            </div>
            <div class="card-description" style="float: right;font-weight: 700;margin: 5px;margin-left: 0;">
              <div class="card-text" style="line-height: 18px;color: rgba(0,0,0,.45);font-size: 16px;margin-bottom: 8px;">
                Visitors
              </div>
              <span class="card-num" style="font-size: 20px;">
                 102000
               </span>
            </div>

          </el-card>
        </el-col>
        <el-col :span="6" :xs="12" :sm="12" :lg="6">
          <el-card class="box-card">
            <div class="card-panel">
              <i class="el-icon-share" style="color: #40c9c6;font-size: 48px;text-align: center;line-height: 10px;"></i>
            </div>
            <div class="card-description" style="float: right;font-weight: 700;margin: 5px;margin-left: 0;">
              <div class="card-text" style="line-height: 18px;color: rgba(0,0,0,.45);font-size: 16px;margin-bottom: 8px;">
                Visitors
              </div>
              <span class="card-num" style="font-size: 20px;">
                 102000
               </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" :xs="12" :sm="12" :lg="6">
          <el-card class="box-card">
            <div class="card-panel">
              <i class="el-icon-share" style="color: #40c9c6;font-size: 48px;text-align: center;line-height: 10px;"></i>
            </div>
            <div class="card-description" style="float: right;font-weight: 700;margin: 5px;margin-left: 0;">
              <div class="card-text" style="line-height: 18px;color: rgba(0,0,0,.45);font-size: 16px;margin-bottom: 8px;">
                Visitors
              </div>
              <span class="card-num" style="font-size: 20px;">
                 102000
               </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" :xs="12" :sm="12" :lg="6">
          <el-card class="box-card">
            <div class="card-panel">
              <i class="el-icon-share" style="color: #40c9c6;font-size: 48px;text-align: center;line-height: 10px;"></i>
            </div>
            <div class="card-description" style="float: right;font-weight: 700;margin: 5px;margin-left: 0;">
              <div class="card-text" style="line-height: 18px;color: rgba(0,0,0,.45);font-size: 16px;margin-bottom: 8px;">
                Visitors
              </div>
              <span class="card-num" style="font-size: 20px;">
                 102000
               </span>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>
    <div class="el-row" style="background: rgb(255,255,255);padding: 16px 16px 0px;margin-bottom: 32px;margin-top: 32px;position: relative;box-sizing: border-box;">
      <div class="box-water" id="box-water" style="height: 350px;width: 100%;position: relative;box-sizing: inherit;">
      </div>
    </div>
    <div class="el-row" style="margin-left: -16px;margin-right: -16px; position: relative;box-sizing: border-box;">
      <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-lg-8" style="padding-left: 16px;padding-right: 16px;">
        <div class="chart-wrapper" style="background: #fff;padding: 16px 16px 0;margin-bottom: 32px;">
          <div id="pic1" style="height: 300px;width: 100%;position: relative;">
          </div>
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-lg-8" style="padding-left: 16px;padding-right: 16px;">
        <div class="chart-wrapper" style="background: #fff;padding: 16px 16px 0;margin-bottom: 32px;">
          <div id="pic2" style="height: 300px;width: 100%;position: relative;">
          </div>
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-lg-8" style="padding-left: 16px;padding-right: 16px;">
        <div class="chart-wrapper" style="background: #fff;padding: 16px 16px 0;margin-bottom: 32px;">
          <div id="pic3" style="height: 300px;width: 100%;position: relative;">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data() {
      return {
        colors: ['#5793f3', '#d14a61', '#675bba'],
        option: '',
        option1: {
          angleAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            z: 10
          },
          radiusAxis: {},
          polar: {},
          series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
          }, {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
          }, {
            type: 'bar',
            data: [1, 2, 3, 4, 1, 2, 5],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
          }],
          legend: {
            show: true,
            data: ['A', 'B', 'C']
          }
        }
      }
    },
    mounted() {
      this.initOption()
      this.showChart()
    },
    methods: {
      initOption() {
        this.option = {
          color: this.colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['2015 降水量', '2016 降水量']
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [{
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: this.colors[1]
                }
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return '降水量  ' + params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: this.colors[0]
                }
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return '降水量  ' + params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
            }
          ],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '2015 降水量',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '2016 降水量',
              type: 'line',
              smooth: true,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            }
          ]
        }
      },
      showChart() {
        var myChart = echarts.init(document.getElementById('box-water'))
        myChart.setOption(this.option)
        
        var chart1 = echarts.init(document.getElementById('pic1'))
        chart1.setOption(this.option1)
        
        var chart2 = echarts.init(document.getElementById('pic2'))
        chart2.setOption(this.option1)
        
        var chart3 = echarts.init(document.getElementById('pic3'))
        chart3.setOption(this.option1)
        window.onresize = function(){
          myChart.resize()
          chart1.resize()
          chart2.resize()
          chart3.resize()
        }
        
      }
    }
  }
</script>

<style scoped>
  .box-card {
    height: 98px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    border-color: rgba(0, 0, 0, .05);
  }
  
  .card-panel {
    float: left;
    margin: 25px 0 0 0px;
    padding: 0px;
    transition: all .38s ease-out;
    border-radius: 6px;
  }
  
  .homepage{
    position: relative;
    height: 1500px;
    width:100%;
    background-color: #f0f2f5;
    /*padding: ;*/
  }
</style>