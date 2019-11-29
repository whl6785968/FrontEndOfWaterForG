<template>
  <div class="reportList">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150" align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="240" align="center">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="日期"
      width="200" align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作" align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
        this.$store.dispatch('report/getHistoryList').then(response => {
          this.tableData = response.obj
        })
      },
      handleClick(row){
//      /report/reportDeatils/:createTime
        this.$router.push('/report/reportDeatils/'+row.createTime)
      }
    }
  }
</script>

<style>
.reportList{
  width: 100%;
  background-color: #FFFFFF;
}
</style>