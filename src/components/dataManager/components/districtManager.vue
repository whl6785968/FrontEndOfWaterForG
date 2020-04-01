<template>
  <div class="districtManage">
    <div style="margin-bottom: 20px;float: left;">
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>

    </div>
    <div class="block" style="float: right;">
      <el-pagination  :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="defalut_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
      </el-pagination>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="区域编号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="区域名称" width="500" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作"  align="center">
        <template slot-scope="scope">
          <el-button @click="showModifyWindow(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteDistrict(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible"  :modal="true" :modal-append-to-body="false" style="margin-left:150px;margin-top: -50px; " width="600px">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" style="width: 350px;padding-left: 100px;">
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
    
     <el-dialog title="修改" :visible.sync="dialogFormVisible1"  :modal="true" :modal-append-to-body="false" style="margin-left:150px;margin-top: -50px; " width="600px">
      <el-form ref="form1" :model="form1" label-width="120px" label-position="left" style="width: 350px;padding-left: 100px;">
        <el-form-item label="区域编号">
          <el-input v-model="form1.id" style="width: 200px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="form1.name" style="width: 200px;"></el-input>
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
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form:{
          id: '',
          name:''
        },
        form1:{
          id: '',
          name:''
        },
        currentPage: 1,
        defalut_pageSize: 10,
        totalPage: 0
      }
    },
    mounted() {
      this.initData()
    },
    inject: ['reload'],
    methods: {
      initData() {
         const info = {
          page: this.currentPage,
          pageSize: this.defalut_pageSize
        }
         
        this.$store.dispatch('sysd/getAllDistrict',info).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.total
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
      },
      showModifyWindow(row){
        this.dialogFormVisible1 = true
        this.form1.id = row.id
        this.form1.name = row.name
      },
      modify(){
        this.$store.dispatch('sysd/modifyDistrict',this.form1).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      },
      deleteDistrict(row){
        const id = row.id
        this.$store.dispatch('sysd/deleteDistrict',id).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      }
    }
  }
</script>

<style>
  .districtManage{
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>