<template>
  <div class="stationManager">
    <!--<div style="padding: 10px;float: right;">
      <el-button type="primary" size="small">主要按钮</el-button>
    </div>-->
    <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
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
      <el-table-column prop="responsible" label="负责人ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="userinfo.name" label="负责人名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="district.name" label="所属片区" width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible" @open="open" :modal="false" style="margin-left:200px;margin-top: -100px; " width="600px">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 350px;">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      initData() {
        this.$store.dispatch('sysd/getAllStation').then(response => {
          //          alert(JSON.stringify(response))
          this.tableData = response.obj
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      open() {
        this.$store.dispatch('sysd/getAllUser').then(response => {
          this.users = response.obj
          this.$store.dispatch('sysd/getAllDistrict').then(response => {
            this.districts = response.obj
          })
        })
      },
      add(){
//      alert(JSON.stringify(this.form))
        this.$store.dispatch('sysd/addStation',this.form).then(response => {
          if(response.status == 200){
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.reload()
          }
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
        currentPage4: 4,
        dialogFormVisible: false,
        districts: '',
        users: '',
        form: {
          id: '',
          name: '',
          longtitude: '',
          latitude: '',
          currLevel: '',
          preLevel: '',
          user: '',
          district: ''
        }
      }
    }
  }
</script>

<style>

</style>