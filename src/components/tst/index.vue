<template>
  <div>
    <h1>sadasdasd</h1>
    <el-button type="primary" @click="tst">
      点我
    </el-button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        
      }
    },
    methods: {
      tst(){
        this.$store.dispatch('algo/tst').then(response => {
          
        })
      }
    }
    
  }
</script>

<style>
</style>