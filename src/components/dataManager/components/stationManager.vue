<template>
  <div class="stationManager">
    <!--<div style="padding: 10px;float: right;">
      <el-button type="primary" size="small">主要按钮</el-button>
    </div>-->
    <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="defalut_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
      </el-pagination>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="站点编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="站点名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="longtitude" label="经度" width="120" align="center">
      </el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120" align="center">
      </el-table-column>
      <el-table-column prop="currlevel" label="当前水质等级" width="100" align="center">
      </el-table-column>
      <el-table-column prop="prelevel" label="上周水质等级" width="100" align="center">
      </el-table-column>
      <el-table-column prop="upstreamId" label="上游站点" width="100" align="center">
      </el-table-column>
      <el-table-column prop="downstreamId" label="下游站点" width="100" align="center">
      </el-table-column>
      <el-table-column prop="responsible" label="负责人ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="userinfo.name" label="负责人名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="district.name" label="所属片区" width="200" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="showModifyWindow(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="showDeleteWindow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible" @open="open" :modal="true" :modal-append-to-body="false" style="margin-left:200px;margin-top: -100px; " width="600px">
      <div class="add_form" style="padding-left: 100px;">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 500px" size="small">
          <el-form-item label="站点编号">
            <el-input v-model="form.id" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-input v-model="form.name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="站点经度">
            <el-input v-model="form.longtitude" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="站点纬度">
            <el-input v-model="form.latitude" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="当前水质等级">
            <el-input v-model="form.currLevel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="上周水质等级">
            <el-input v-model="form.preLevel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="上游站点">
            <el-select v-model="form.upstreamId" placeholder="请选择上游站点">
              <el-option label="无" value="null"></el-option>
              <el-option :label="item.stationName" :value="item.stationId" v-for="(item,index) in stations" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上游站点">
            <el-select v-model="form.downstreamId" placeholder="请选择下游站点">
              <el-option label="无" value="null"></el-option>
              <el-option :label="item.stationName" :value="item.stationId" v-for="(item,index) in stations" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="负责人">
            <el-select v-model="form.user" placeholder="请选择活动区域">
              <el-option :label="item.name" :value="item.uid" v-for="(item,index) in users" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域 ">
            <el-select v-model="form.district" placeholder="请选择活动区域">
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in districts" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogFormVisible2" @open="open" :modal="true" :modal-append-to-body="false" style="margin-left:200px;margin-top: -100px; " width="600px">
      <div class="modify_form" style="padding-left: 100px;">
        <el-form ref="form1" :model="form1" label-width="120px" label-position="left" style="width: 350px;" size="small">
          <el-form-item label="站点编号">
            <el-input v-model="form1.id" style="width: 200px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-input v-model="form1.name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="站点经度">
            <el-input v-model="form1.longtitude" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="站点纬度">
            <el-input v-model="form1.latitude" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="当前水质等级">
            <el-input v-model="form1.currLevel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="上周水质等级">
            <el-input v-model="form1.preLevel" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item label="上游站点">
            <el-select v-model="form1.upstreamId" placeholder="请选择上游站点">
              <el-option label="无" :value="null"></el-option>
              <el-option :label="item.stationName" :value="item.stationId" v-for="(item,index) in stations" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下游站点">
            <el-select v-model="form1.downstreamId" placeholder="请选择下游站点">
              <el-option label="无" :value="null"></el-option>
              <el-option :label="item.stationName" :value="item.stationId" v-for="(item,index) in stations" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="负责人">
            <el-select v-model="form1.user" placeholder="请选择活动区域">
              <el-option :label="item.name" :value="item.uid" v-for="(item,index) in users" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属区域 ">
            <el-select v-model="form1.district" placeholder="请选择活动区域">
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in districts" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center :modal-append-to-body="false" style="margin-top: 20px;">
      <span>该操作会删除位于该站点的设备信息和此设备具有的数据，确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteStation">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    methods: {
      initData() {
        const info = {
          page: this.currentPage,
          pageSize: this.defalut_pageSize
        }
        this.$store.dispatch('sysd/getAllStation', info).then(response => {
          const station_id_list = []
          const data = response.obj.list
          for(let i = 0; i < data.length; i++) {
            station_id_list.push({
              'stationId': data[i].id,
              'stationName': data[i].name
            })
          }
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
          this.stations = station_id_list
          //        alert(station_id_list)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.defalut_pageSize = val
        const info = {
          page: this.currentPage,
          pageSize: this.defalut_pageSize
        }
        this.$store.dispatch('sysd/getAllStation', info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        const info = {
          page: this.currentPage,
          pageSize: this.defalut_pageSize
        }
        this.$store.dispatch('sysd/getAllStation', info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
        })
      },
      open() {
        this.$store.dispatch('sysd/getAllUser').then(response => {
          this.users = response.obj
          const info = {
            page: 1,
            pageSize: 10000
          }
          this.$store.dispatch('sysd/getAllDistrict',info).then(response => {
            this.districts = response.obj.list
          })
        })
      },
      add() {
        //      alert(JSON.stringify(this.form))
        this.$store.dispatch('sysd/addStation', this.form).then(response => {
          if(response.status == 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.reload()
          }
        })
      },
      showModifyWindow(row) {
        this.dialogFormVisible2 = true
        this.form1.id = row.id
        this.form1.name = row.name
        this.form1.longtitude = row.longtitude
        this.form1.latitude = row.latitude
        this.form1.currLevel = row.currlevel
        this.form1.preLevel = row.prelevel
        this.form1.user = row.userinfo.uid
        this.form1.district = row.district.id
        this.form1.upstreamId = row.upstreamId
        this.form1.downstreamId = row.downstreamId
        this.form1.isAlert = row.isAlert

      },
      modify() {
        this.$store.dispatch('sysd/modifyStation', this.form1).then(response => {
          if(response.status == 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.reload()
          }
        })
      },
      showDeleteWindow(row) {
        this.stationId = row.id
        this.centerDialogVisible = true
      },
      deleteStation() {
        this.$store.dispatch('sysd/deleteStation',this.stationId).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      }
    },
    inject: ['reload'],
    mounted() {
      this.initData()
    },
    data() {
      return {
        tableData: [],
        currentPage: 1,
        defalut_pageSize: 10,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        districts: '',
        users: '',
        totalPage: 0,
        stations: [],
        centerDialogVisible: false,
        stationId: '',
        form: {
          id: '',
          name: '',
          longtitude: '',
          latitude: '',
          currLevel: '',
          preLevel: '',
          user: '',
          district: '',
          upstreamId: '',
          downstreamId: ''
        },
        form1: {
          id: '',
          name: '',
          longtitude: '',
          latitude: '',
          currLevel: '',
          preLevel: '',
          user: '',
          district: '',
          upstreamId: '',
          downstreamId: '',
          isAlert: ''
        }
      }
    }
  }
</script>

<style>
  .stationManager {
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>