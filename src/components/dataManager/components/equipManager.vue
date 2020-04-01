<template>
  <div class="equipManage">
     <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="default_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
      </el-pagination>
    </div>
     <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="设备编号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="150" align="center">
      </el-table-column>
      <el-table-column prop="model" label="设备型号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="productiontime" label="生产日期" width="150" align="center">
      </el-table-column>
      <el-table-column prop="availabletime" label="设备使用年限" width="120" align="center">
      </el-table-column>
      <el-table-column prop="productionplace" label="设备生产商" width="150" align="center">
      </el-table-column>
      <el-table-column prop="status" label="设备状态" width="120" align="center">
      </el-table-column>
      <el-table-column prop="station.name" label="所属站点" width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="showModifyWindow(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog title="添加" :visible.sync="dialogFormVisible" @open="getStation"  :modal="true" :modal-append-to-body="false" style="margin-left:170px;margin-top: -100px; " width="600px" >
      <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 350px;padding-left: 100px;" size="small">
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
    
    
    <el-dialog title="修改" :visible.sync="dialogFormVisible1" @open="getStation"  :modal="true" :modal-append-to-body="false" style="margin-left:170px;margin-top: -100px; " width="600px" >
      <el-form ref="form1" :model="form1" label-width="120px" label-position="left" style="width: 350px;padding-left: 100px;" size="small">
        <el-form-item label="设备编号">
          <el-input v-model="form1.id" style="width: 200px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form1.name" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备型号">
          <el-input v-model="form1.model" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备生产日期">
          <el-date-picker
            v-model="form1.productiontime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="设备使用年限">
          <el-input v-model="form1.availabletime" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备生产商">
          <el-input v-model="form1.productionplace" style="width: 200px;"></el-input>
        </el-form-item>
         <el-form-item label="设备状态">
          <el-input v-model="form1.status" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="设备所属站点">
          <el-select v-model="form1.stationId" placeholder="请选择">
             <el-option label="无" value="000"></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in stations" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
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
        dialogFormVisible1: false,
        currentPage: 1,
        default_pageSize: 10,
        totalPage: 0,
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
        form1: {
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
        const info = {
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('sysd/getAllEquip',info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
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
      },
      showModifyWindow(row){
        this.dialogFormVisible1 = true
        this.form1.id = row.id
        this.form1.name = row.name
        this.form1.model = row.model
        this.form1.productiontime = row.productiontime
        this.form1.availabletime = row.availabletime
        this.form1.productionplace = row.productionplace
        this.form1.status = row.status
        this.form1.stationId = row.station.id
      },
      modify(){
        this.$store.dispatch('sysd/modifyEquip',this.form1).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.defalut_pageSize = val
        const info = {
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('sysd/getAllEquip',info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        const info = {
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('sysd/getAllEquip',info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
        })
      },
    }
  }
</script>

<style>
  .equipManage{
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>