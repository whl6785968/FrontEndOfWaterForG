<template>
  <div class="report">
    <div class="title" style="width: 100%;text-align: center;margin-bottom: 50px;">
      <h3>{{currDate | dateFormat}} - {{preDate | dateFormat}}水质自动监测周报</h3>
    </div>
    <el-row>
      <div class="content1" style="margin-bottom: 50px;">
        如下图， 本周所监测的{{stationCount}}个站点中优于Ⅲ类水质的站点有{{greaterThree}}个,占比{{greaterThreeRate}}%, {{greaterThree>preGreaterThree?'同比增长'+ (greaterThreeRate-preGreaterThreeRate) + '个百分点':'同比下降'+(preGreaterThreeRate-greaterThreeRate) + '个百分点'}}, Ⅴ类水质站点有{{terribleFive}}个
      </div>
    </el-row>
    <el-row>
      <div class="el-col el-col-24 el-col-xs-24 el-col-md-12 el-col-12">
        <div id="AllStationStatistic" style="height: 300px;width: 100%;">
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-24 el-col-md-12 el-col-12">
        <div id="AllStationPreStatistic" style="height: 300px;width: 100%;"></div>
      </div>
    </el-row>
    <el-row>
      <div class="content2" style="margin-bottom: 50px;margin-top: 50px;">
        截至目前，仍有{{breakDownEquipCount}}个设备处于故障状态，请尽快联系其负责人进行维修，故障设备和负责人联系方式如下:
      </div>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="设备ID" width="150" align="center">
        </el-table-column>
        <el-table-column prop="name" label="设备名称" width="150" align="center">
        </el-table-column>
        <el-table-column prop="model" label="型号" width="150" align="center">
        </el-table-column>
        <el-table-column prop="productionplace" label="生产商" width="150" align="center">
        </el-table-column>
        <el-table-column prop="station.name" label="所属站点" width="120" align="center">
        </el-table-column>
        <el-table-column prop="station.userinfo.uid" label="负责人ID" width="120" align="center">
        </el-table-column>
        <el-table-column prop="station.userinfo.name" label="负责人名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="station.userinfo.link" label="负责人联系方式" width="150" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data() {
      return {
        curry: [],
        prey: [],
        tx: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类'],
        currDate: new Date(),
        preDate: new Date(new Date() - 3600 * 1000 * 24 * 7),
        greaterThree: 0,
        greaterThreeRate: 0,
        terribleFive: 0,
        terribleFiveRate: 0,
        stationCount: 0,
        preGreaterThree: 0,
        preGreaterThreeRate: 0,
        tableData: [],
        breakDownEquipCount: 0
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.$store.dispatch('report/getCountByLevel').then(response => {
          const curry = []
          const prey = []
          const curr = response.obj.curr
          const pre = response.obj.pre
          let stationCount = 0
          let greaterThree = 0
          let terribleFive = 0
          let preGreaterThree = 0
          for(let i = 0; i < curr.length; i++) {
            stationCount += curr[i]
            curry.push({
              name: this.tx[i],
              value: curr[i]
            })
            prey.push({
              name: this.tx[i],
              value: pre[i]
            })
          }
          greaterThree = curr[0] + curr[1] + curr[2]
          preGreaterThree = pre[0] + pre[1] + pre[2]
          this.stationCount = stationCount
          this.greaterThree = greaterThree
          this.greaterThreeRate = (greaterThree / this.stationCount).toFixed(2) * 100
          this.terribleFive = terribleFive
          this.terribleFiveRate = (terribleFive / this.stationCount).toFixed(3) * 100

          this.preGreaterThree = preGreaterThree
          this.preGreaterThreeRate = (preGreaterThree / this.stationCount).toFixed(2) * 100

          this.curry = curry
          this.prey = prey
          this.showChart()

          this.$store.dispatch('report/getBreakDownEquip').then(response => {
              this.tableData = response.obj
              this.breakDownEquipCount = response.obj.length
          })
        })

      },
      showChart() {
        let option = {
          title: {
            text: '本周所有站点的水质等级统计',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.tx
          },
          series: [{
            name: '数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.curry,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

        let option1 = {
          title: {
            text: '上周所有站点的水质等级统计',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.tx
          },
          series: [{
            name: '数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.prey,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

        var myChart = echarts.init(document.getElementById('AllStationStatistic'), 'light')
        myChart.setOption(option)

        var myChart = echarts.init(document.getElementById('AllStationPreStatistic'), 'light')
        myChart.setOption(option1)
      }
    }
  }
</script>

<style>
  .report {
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>