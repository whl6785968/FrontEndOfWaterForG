<template>
  <div class="dataDetails">
    <div class="el-row">
      <div class="el-col el-col-24 el-col-xs-24 el-col-md-24 el-col-sm-24 el-col-lg-24">
        <div class="back">
          <el-page-header @back="goBack" content="详情页面">
          </el-page-header>
        </div>
      </div>

    </div>

    <div class="el-row" style="margin-left: 32%">
      <el-select v-model="dataField" placeholder="活动区域">
        <el-option v-for="(item,index) in this.fieldName" :label="item" :value="item" :key="item"></el-option>
      </el-select>
      <el-button type="primary" @click="initData">查询数据</el-button>
      <el-button type="success"><i class="fa fa-lg fa-level-down" style="margin-right: 0px"></i>导出数据</el-button>
    </div>
    <el-row>
      <div id="chartDistrict" ref="chartDistrict" style="height: 500px;width: 100%;margin-top: 30px;"></div>
    </el-row>
    <div class="historyData" style="padding: 50px;">
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" :stripe="true" :border="true" height="500" ref="multipleTable" 
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="createTame" label="日期" sortable width="180" :formatter="dateFormat" align="center">
        </el-table-column>
        <el-table-column prop="ph" label="PH值" sortable width="100" align="center">
        </el-table-column>
        <!--:formatter="formatter"-->
        <el-table-column prop="disslove" label="溶解度" sortable width="100" align="center">
        </el-table-column>
        <el-table-column prop="nh" label="氨氮" sortable width="100" align="center">
        </el-table-column>
        <el-table-column prop="kmno" label="高锰酸盐" sortable width="120" align="center">
        </el-table-column>
        <el-table-column prop="totalp" label="总磷" sortable width="100" align="center">
        </el-table-column>
        <el-table-column fixed="right" align="center">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-has="['ROLE_ADMIN']">Edit</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-has="['ROLE_ADMIN']">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()" v-has="['ROLE_ADMIN']">删除</el-button>
        <el-button @click="clearSelection()" v-has="['ROLE_ADMIN']">取消选择</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  var echarts = require('echarts');
  import has from '@/directive/permissions.js'
  export default {
    data() {
      return {
        dataField: 'ph',
        option1: '',
        eid: this.$route.params.id,
        fieldName: [],
        chartData: [],
        tableData: [],
        search: '',
        multipleSelection: []
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.$store.dispatch("datar/getWaterData", this.eid).then(response => {
          //                  alert(JSON.stringify(response))
          this.tableData = response
          const fieldName = []
          const chartData = []

          for(var realKey in response[0]) {
            if(realKey == 'id' || realKey == 'createTame' || realKey == 'eid') {
              continue
            } else {
              fieldName.push(realKey)
            }
          }

          this.fieldName = fieldName
          const x = []
          for(var i = 0; i < response.length; i++) {
            x.push(this.realFormatProcess(response[i].createTame))
            //          alert(JSON.stringify(response[i]))
            for(var key in response[i]) {
              if(this.dataField == key) {
                //              alert(response[i][key])
                chartData.push(response[i][key])
              }
            }
          }

          this.chartData = chartData

          const option = {
            xAxis: {
              type: 'category',
              data: x
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: chartData,
              type: 'line',
              smooth: true
            }]
          }

          this.option1 = option

          var myChart = echarts.init(document.getElementById('chartDistrict'))
          myChart.setOption(this.option1)
          window.onresize = function() {
            myChart.resize()
          }
        })
      },
      onSubmit() {
        console.log('submit!');
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
      toggleSelection() {
//      alert(JSON.stringify(this.multipleSelection))
        
      },
      clearSelection(){
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      dateFormat(row,column){
        return this.realFormatProcess(row.createTame)
      },
      realFormatProcess(dateStr){
        var dt = new Date(dateStr)
        var y = dt.getFullYear()
        var m = (dt.getMonth()+1).toString().padStart(2,"0")
        var d = dt.getDate().toString().padStart(2,"0")
        var hh = dt.getHours().toString().padStart(2,"0")
        var mm = dt.getMinutes().toString().padStart(2,"0")
        var ss = dt.getSeconds().toString().padStart(2,"0")
        
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
      
    }
  }
</script>

<style>
  .dataDetails {
    background-color: #FFFFFF;
    width: 100%;
  }
  
  .searchForm {}
  
  .back {
    margin-top: 20px;
    margin-left: 20px;
  }
</style>