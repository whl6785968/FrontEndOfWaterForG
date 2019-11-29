<template>
  <div class="report">
    <div class="top">
      <div class="back">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
      </div>
    </div>
    <div class="body">
      <div class="title" style="width: 100%;text-align: center;margin-bottom: 50px;">
      <h3>{{createTime}}水质自动监测周报</h3>
    </div>
    <el-row>
      <div class="content1" style="margin-bottom: 50px;">
        如下图， 本周所监测的{{stationCount}}个站点中优于Ⅲ类水质的站点有{{greaterThree}}个,占比{{greaterThreeRate}}%, {{greaterThree>preGreaterThree?'同比增长'+ (greaterThreeRate-preGreaterThreeRate) + '个百分点':'同比下降'+(preGreaterThreeRate-greaterThreeRate) + '个百分点'}}, Ⅳ类水质站点有{{terribleFour}}个, Ⅴ类水质站点有{{terribleFive}}个
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
      <div style="margin-bottom: 50px;">
        下图为各类水质的区域分布：
      </div>
      
    </el-row>
    <el-row>
      <div class="el-col el-col-24 el-col-xs-24 el-col-md-12 el-col-12" v-for="(item,index) in tx" :key="index" style="padding-bottom: 50px;">
        <div :id="item" style="height: 300px;width: 100%;">
        </div>
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
        <el-table-column prop="name" ltableDataabel="设备名称" width="150" align="center">
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
        greaterThree: 0,
        greaterThreeRate: 0,
        terribleFive: 0,
        terribleFour: 0,
        terribleFiveRate: 0,
        stationCount: 0,
        preGreaterThree: 0,
        preGreaterThreeRate: 0,
        tableData: [],
        breakDownEquipCount: 0,
        tableData2: [],
        createTime: this.$route.params.createTime,
        done: [],
        dtwo: [],
        dthree: [],
        dfour: [],
        dfive: [],
        districts: [],
        dy: [],
        districtOption: {
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
            data: this.districts
          },
          series: [{
            name: '数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.$store.dispatch('report/getHistoryDetails', this.createTime).then(response => {
          const data = response.obj
          this.stationCount = data.length
          let currOne = 0
          let preOne = 0

          let currTwo = 0
          let preTwo = 0

          let currThree = 0
          let preThree = 0

          let currFour = 0
          let preFour = 0

          let currFive = 0
          let preFive = 0

          for(let i = 0; i < data.length; i++) {
            switch(data[i].currLevel) {
              case 1:
                currOne += 1
                break
              case 2:
                currTwo += 1
                break
              case 3:
                currThree += 1
                break
              case 4:
                currFour += 1
                break
              case 5:
                currFive += 1
                break
            }
          }

          for(let i = 0; i < data.length; i++) {
            switch(data[i].preLevel) {
              case 1:
                preOne += 1
                break
              case 2:
                preTwo += 1
                break
              case 3:
                preThree += 1
                break
              case 4:
                preFour += 1
                break
              case 5:
                preFive += 1
                break
            }
          }
          this.greaterThree = currThree + currOne + currTwo
          this.greaterThreeRate = ((this.greaterThree / this.stationCount) * 100).toFixed(2)
          this.preGreaterThree = preOne + preTwo + preThree
          this.preGreaterThreeRate = ((this.preGreaterThree / this.stationCount) * 100).toFixed(2)

          this.terribleFour = currFour
          this.terribleFive = currFive

          const curry = [{
            name: this.tx[0],
            value: currOne
          }, {
            name: this.tx[1],
            value: currTwo
          }, {
            name: this.tx[2],
            value: currThree
          }, {
            name: this.tx[3],
            value: currFour
          }, {
            name: this.tx[4],
            value: currFive
          }]
          const prey = [{
            name: this.tx[0],
            value: preOne
          }, {
            name: this.tx[1],
            value: preTwo
          }, {
            name: this.tx[2],
            value: preThree
          }, {
            name: this.tx[3],
            value: preFour
          }, {
            name: this.tx[4],
            value: preFive
          }]

          this.curry = curry
          this.prey = prey

          this.showChart()
          this.$store.dispatch('report/getHistoryByDistrict',this.createTime).then(response => {
//          alert(JSON.stringify(response.obj))
            const data1 = response.obj
            const districts = []
            const done = []
            const dtwo = []
            const dthree = []
            const dfour = []
            const dfive = []
            for(let key in data1){
              districts.push(key)
              done.push({name:key,value:data1[key][0]})
              dtwo.push({name:key,value:data1[key][1]})
              dthree.push({name:key,value:data1[key][2]})
              dfour.push({name:key,value:data1[key][3]})
              dfive.push({name:key,value:data1[key][4]}) 
            }
            
            const dy = []
            dy.push(done)
            dy.push(dtwo)
            dy.push(dthree)
            dy.push(dfour)
            dy.push(dfive)
            
            this.districts = districts
            this.done = done
            this.dtwo = dtwo
            this.dthree = dthree
            this.dfive = dfive
            this.dfour = dfour
            this.dy = dy
            this.showDistrictChart()
          })
          
          this.$store.dispatch('report/getBreakDownEquip').then(response => {
            this.tableData = response.obj
            this.breakDownEquipCount = response.obj.length

          })

        })

      },
      goBack() {
        if(window.history.length <= 1) {
          this.$router.push({
            path: '/home'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      showDistrictChart(){
        
        for(let i=0;i<this.dy.length;i++){
          this.districtOption.series[0].data = this.dy[i]
          this.districtOption.title.text = this.tx[i]+'水质区域分布'
          const myChart = echarts.init(document.getElementById(this.tx[i]),'light')
          myChart.setOption(this.districtOption)
        }
        
        
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
  }
  
  .top{
    padding: 20px;
    width: 100%;
    background-color: #B3D8FF;
    margin-bottom: 20px;
  }
  
  .body{
    width: 100%;
    padding: 32px;
  }
</style>