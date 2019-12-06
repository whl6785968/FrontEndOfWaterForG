<template>
  <div class="algo">
    <div class="predict">
      <div class="predict_title" style="margin-bottom: 20px;">
        输入水质数据，判断是否异常——————结果:<el-tag type="danger" v-if='isException == -1'>异常数据</el-tag>
        <el-tag type="success" v-if='isException == 1'>正常数据</el-tag>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="ph">
          <el-input v-model="formInline.ph" placeholder="ph"></el-input>
        </el-form-item>
           <el-form-item label="溶解氧">
          <el-input v-model="formInline.disslove" placeholder="溶解氧"></el-input>
        </el-form-item>
           <el-form-item label="氨氮">
          <el-input v-model="formInline.nh" placeholder="氨氮"></el-input>
        </el-form-item>
           <el-form-item label="高猛酸盐">
          <el-input v-model="formInline.kmno" placeholder="高锰酸盐"></el-input>
        </el-form-item>
           <el-form-item label="总有机碳">
          <el-input v-model="formInline.totalp" placeholder="总有机碳"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="predict">预测</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="errorInfo">
      
    </div>
    <el-button type="success" @click="errCheck">op</el-button>
    <!--<el-button type="success" @click="train">op</el-button>-->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        formInline: {
          ph: '',
          disslove: '',
          nh: '',
          kmno: '',
          totalp: ''
        },
        isException: ''
      }
    },
    mounted(){
      
    },
    methods: {
      errCheck(){
        this.$store.dispatch('algo/errCheck').then(response => {
          
        })
      },
      train(){
        this.$store.dispatch('algo/trainIsoForest').then(response => {
          
        })
      },
      predict(){
        this.$store.dispatch('algo/isError',this.formInline).then(response => {
          const isError = response.obj
           this.isException = response.obj  
//        if(isError == 1){
//          this.isException = '正常数据'
//        }
//        else{
//          this.isException = '异常数据'
//        }
           
        })
      }
    }
  }
</script>

<style>
  .algo{
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>