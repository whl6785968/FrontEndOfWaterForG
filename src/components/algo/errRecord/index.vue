<template>
  <div class="errRecord">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="createTime"
      label="日期"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="recordId"
      label="记录编号"
      width="251"
      align="center">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="251"
      align="center">
    </el-table-column>
    <el-table-column
      prop="judge"
      label="判断"
      width="350"
      align="center">
    </el-table-column>
    <el-table-column
      prop="chargerName"
      label="负责人"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="isSolve"
      label="状态"
      width="100"
      align="center"
      >
      <template slot-scope="scope">
        <span class="badge badge-danger" v-if='scope.row.isSolve == 0'>未解决</span>
        <span class="badge badge-success" v-if='scope.row.isSolve == 1'>已解决</span>
      </template>
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.chargerId == userId && scope.row.isSolve == 0 ">解决</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tableData: [],
        userId:''
      }
    },
    mounted(){
      this.getErrRecord()
    },
    methods: {
      getErrRecord(){
        this.userId = sessionStorage.getItem('username')
        this.$store.dispatch('algo/getErrRecord').then(response => {
//        alert(JSON.stringify(response))
          this.tableData = response
        })
      }
    }
  }
</script>

<style>
  .errRecord{
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>