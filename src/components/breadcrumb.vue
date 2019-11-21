<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-text="name"></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: this.$router.currentRoute.name
      }
    },
    watch: {
     '$route'(to,from){
       this.name = this.$router.currentRoute.name
     }
    }
  }
</script>

<style>
  .breadcrumb{
    background-color: white;
  }
</style>