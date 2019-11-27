<template>
  <div class="districtManage">
    <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination  :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="区域编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="区域名称" width="120" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="500" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible"  :modal="false" style="margin-left:150px;margin-top: -50px; " width="600px">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 350px;">
        <el-form-item label="区域编号">
          <el-input v-model="form.id" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
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
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form:{
          id: '',
          name:''
        },
        currentPage4: 4
      }
    },
    mounted() {
      this.initData()
    },
    inject: ['reload'],
    methods: {
      initData() {
        this.$store.dispatch('sysd/getAllDistrict').then(response => {
          this.tableData = response.obj
        })
      },
      add(){
        this.$store.dispatch('sysd/addDistrict',this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.reload()
        })
      }
    }
  }
</script>

<style>

</style>