<template>
  <div class="equipManage">
     <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination  :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>
     <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="设备编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="model" label="设备型号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="productiontime" label="生产日期" width="120" align="center">
      </el-table-column>
      <el-table-column prop="availabletime" label="设备使用年限" width="120" align="center">
      </el-table-column>
      <el-table-column prop="productionplace" label="设备生产商" width="120" align="center">
      </el-table-column>
      <el-table-column prop="status" label="设备状态" width="120" align="center">
      </el-table-column>
      <el-table-column prop="station.name" label="所属站点" width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog title="添加" :visible.sync="dialogFormVisible" @open="getStation"  :modal="false" style="margin-left:170px;margin-top: -100px; " width="600px">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 350px;">
        <el-form-item label="设备编号">
          <el-input v-model="form.id" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备型号">
          <el-input v-model="form.model" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备生产日期">
          <el-date-picker
            v-model="form.productiontime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="设备使用年限">
          <el-input v-model="form.availabletime" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备生产商">
          <el-input v-model="form.productionplace" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备状态">
          <el-input v-model="form.status" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="设备所属站点">
          <el-select v-model="form.stationId" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in stations" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        dialogFormVisible: false,
        currentPage: 4,
        form: {
          id: '',
          name: '',
          model: '',
          productiontime: '',
          availabletime: '',
          productionplace: '',
          status: '',
          stationId: ''
        },
        stations: ''
      }
    },
    mounted(){
      this.initData()
    },
    inject: ['reload'],
    methods: {
      initData(){
        this.$store.dispatch('sysd/getAllEquip').then(response => {
          this.tableData = response.obj
        })
      },
      getStation(){
        const info = {page: 1,pageSize: 1000}
        this.$store.dispatch('sysd/getAllStation',info).then(response => {
          this.stations = response.obj.list
        })
      },
      add(){
//      alert(JSON.stringify(this.form))  
        this.$store.dispatch('sysd/addEquip',this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.reload()
          this.dialogFormVisible = false
        })
      }
    }
  }
</script>

<style>
</style>