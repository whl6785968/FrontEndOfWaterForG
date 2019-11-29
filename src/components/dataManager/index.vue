<template>
  <div class="dataManager" style="width: 100%;background-color: #FFFFFF;padding: 32px;">
    <el-tabs tab-position="left" style="height: 100%;">
    <el-tab-pane label="站点管理">
      <stationManager></stationManager>
    </el-tab-pane>
    <el-tab-pane label="区域管理">
      <districtManager></districtManager>
    </el-tab-pane>
    <el-tab-pane label="设备管理">
      <equipManager></equipManager>
    </el-tab-pane>
    <el-tab-pane label="数据管理">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
  import stationManager from './components/stationManager.vue'
  import districtManager from './components/districtManager.vue'
  import equipManager from './components/equipManager.vue'
  export default {
    data(){
      return {
        
      }
    },
    components:{
      'stationManager':stationManager,
      'districtManager':districtManager,
      'equipManager':equipManager
    }
  }
</script>

<style>
</style>