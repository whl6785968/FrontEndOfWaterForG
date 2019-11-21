<template>
  <div class="dataR">
    <!--:row-class-name="tableRowClassName"-->
    <div class="data" style="background-color: #FFFFFF;">
      <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备编号 ">
            <el-input v-model="formInline.id" placeholder="设备编号" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="设备名称 ">
            <el-input v-model="formInline.equipName" placeholder="设备名称" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-select v-model="formInline.equipModel" placeholder="设备型号" style="width: 150px;">
              <el-option label="---请选择---" value=""></el-option>
              <el-option :label="item" :value="item" v-for="(item,index) in this.equipModels" :key="index"></el-option>
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="站点 ">
            <el-select v-model="formInline.station" placeholder="站点" style="width: 150px;">
              <el-option label="---请选择---" value=""></el-option>
              <el-option :label="item" :value="item" v-for="(item,index) in this.stations" :key="index"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="设备状态">
            <el-select v-model="formInline.status" placeholder="设备状态" style="width: 150px;">
              <el-option label="---请选择---" value=""></el-option>
              <el-option :label="item" :value="item" v-for="(item,index) in this.statuss" :key="index"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="水质等级">
            <el-select v-model="formInline.level" placeholder="水质等级" style="width: 150px;">
              <el-option label="---请选择---" value=""></el-option>
              <el-option :label="item" :value="item" v-for="(item,index) in this.levels" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getEquipAndStation">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand" fixed="left" width="50">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="设备编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="设备名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="设备型号">
                <span>{{ props.row.model }}</span>
              </el-form-item>
              <el-form-item label="设备生产日期">
                <span>{{ props.row.productiontime }}</span>
              </el-form-item>
              <el-form-item label="设备使用年限">
                <span>{{ props.row.availabletime }}</span>
              </el-form-item>
              <el-form-item label="设备生产厂家">
                <span>{{ props.row.productionplace }}</span>
              </el-form-item>
              <el-form-item label="设备状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="所属站点名称">
                <span>{{ props.row.station.name }}</span>
              </el-form-item>
              <el-form-item label="所属站点当前水质等级">
                <span>{{ props.row.station.currlevel }}</span>
              </el-form-item>
              <el-form-item label="所属站点上周水质等级">
                <span>{{ props.row.station.prelevel }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="设备编号" prop="id" width="150" align="center">
        </el-table-column>
        <el-table-column label="设备名称" prop="name" width="150" align="center">
        </el-table-column>
        <el-table-column label="设备型号" prop="model" width="200" align="center">
        </el-table-column>
        <el-table-column label="所属站点名称" prop="station.name" width="200" align="center">
        </el-table-column>
        <el-table-column label="设备状态" prop="status" width="200" align="center">
        </el-table-column>
        <el-table-column label="所属站点当前水质等级" prop="station.currlevel" width="200" align="center">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">数据详情</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          id: '',
          equipName: '',
          equipModel: '',
          station: '',
          status: '',
          level: '',
          isInit: false
        },
        equipModels: [],
        stations: [],
        statuss: [],
        levels: []
      }
    },
   mounted() {
      this.getEquipAndStation()
    },
    inject: ['reload'],
    methods: {
      getEquipAndStation() {
        this.$store.dispatch('datar/getEquipAndStation',this.formInline).then(response => {
          this.tableData = response
          if(!this.isInit){
            var equipModels = []
            var stations = []
            var statuss = []
            var levels = []
            response.forEach((item,index) => {
              equipModels.push(item.model)
              stations.push(item.station.name)
              statuss.push(item.status)
              levels.push(item.station.currlevel)
            })
            
            this.equipModels = this.unique(equipModels)
            this.stations = this.unique(stations)
            this.statuss = this.unique(statuss)
            this.levels = this.unique(levels)
            this.isInit = true
          }
          
//        this.reload()
        })
      },
      unique(array){
        return Array.from(new Set(array.sort()))
      },
      //0:没有故障停机 1：正常 2:故障 3：维修
      tableRowClassName({
        row,
        rowIndex
      }) {
        if(row.status === 2) {
          return 'warning-row';
        } else if(row.status === 3) {
          return 'repair-row';
        }
        return '';
      },
      handleClick(row){
        this.$router.push("/dataRelated/equipList/dataDetails/"+row.id)
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .repair-row {
    background: #B4BCCC;
  }
  
  .demo-table-expand {
    font-size: 0;
  }
  
  .demo-table-expand label {
    width: 160px;
    color: #99a9bf;
  }
  
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
  .dataR {
    width: 100%;
    /*height: 1500px;*/
  }
  
  .demo-form-inline{
    /*margin-left: 180px;*/
    padding: 30px;
  }
</style>