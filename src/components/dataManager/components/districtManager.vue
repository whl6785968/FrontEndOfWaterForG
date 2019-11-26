<template>
  <div class="districtManage">
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
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: []
      }
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData(){
        this.$store.dispatch('sysd/getAllDistrict').then(response => {
            this.tableData = response.obj
        })
      }
    }
  }
</script>

<style>
</style>