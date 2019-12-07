<template>
  <div class="algo">
    
    <div class="predict" style="margin-bottom: 20px;">
      <div class="predict_title" style="margin-bottom: 20px;">
        <div class="alert alert-info" role="alert">  
          <h1>Prediction</h1>
          <font size="4">输入水质数据，判断是否异常——————结果:</font>
           <el-tag type="danger" v-if='isException == -1'>异常数据</el-tag>
           <el-tag type="success" v-if='isException == 1'>正常数据</el-tag>
        </div>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.ph" placeholder="ph" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.disslove" placeholder="溶解氧" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.nh" placeholder="氨氮" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.kmno" placeholder="高锰酸盐" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.totalp" placeholder="总有机碳" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="predict" style="width: 80px;">预测</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="standard" style="margin-bottom: 20px;">
      <!--<div class="alert alert-primary" role="alert" style="text-align: center;">
          水质评价国家标准
        </div>-->
      <!--<p>水质评价国家标准</p>-->
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" colspan="6" style="text-align: center;">水质评价国家标准</th>
          </tr>
        </thead>
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="text-align: center;">类别</th>
            <th scope="col" style="text-align: center;">Ⅰ类</th>
            <th scope="col" style="text-align: center;">Ⅱ类</th>
            <th scope="col" style="text-align: center;">Ⅲ类</th>
            <th scope="col" style="text-align: center;">Ⅳ类</th>
            <th scope="col" style="text-align: center;">Ⅴ类</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style="text-align: center;">Ph</th>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">6.5-8.5</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">5.5-6.5 或者 8.5-9</td>
            <td style="text-align: center;">小于5.5 或者 大于9</td>
          </tr>
          <tr style="text-align: center;">
            <th scope="row" style="text-align: center;">溶解氧</th>
            <td>7.5mg/L</td>
            <td>6mg/L</td>
            <td>5mg/L</td>
            <td>3mg/L</td>
            <td>2mg/L</td>
          </tr>
          <tr style="text-align: center;">
            <th scope="row">氨氮</th>
            <td>≤0.02</td>
            <td>≤0.02</td>
            <td>≤0.2</td>
            <td>≤0.5</td>
            <td>>0.5</td>
          </tr>
          <tr style="text-align: center;">
            <th scope="row">高锰酸盐</th>
            <td>≤1.0</td>
            <td>≤2.0</td>
            <td>≤3.0</td>
            <td>≤10</td>
            <td>>10</td>
          </tr>
          <tr style="text-align: center;">
            <th scope="row">总有机碳</th>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="alert alert-info" role="alert">
      <h1>Prompt</h1>
      <div>
        <p><font size="4">下面异常数据信息中，异常数据均值、正常数据均值等以列表展示出来的信息，数据从左到右分别代表ph、溶解氧、氨氮、高锰酸盐、总有机碳</font></p>
      </div>
    </div>
    
    <div class="errorInfos">
      <div class="errInfo" v-for="(item,index) in errInfos" :key='index' style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><span class="badge badge-pill badge-dark">{{item.station}}</span>
            <span class="badge badge-pill badge-info">{{item.equipmentId}}</span>
            <span class="badge badge-pill badge-primary">{{item.equipmentName}}</span></span>
            <span class="badge badge-danger" v-if='item.bad_percent >= 0.25' style="float: right;">Danger</span>
            <span class="badge badge-warning" v-if='0.2 > item.bad_percent && item.bad_percent >= 0.1' style="float: right;">Warning</span>
            <span class="badge badge-success" v-if='0.1 > item.bad_percent' style="float: right;">Normal</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div>
            <ul style="margin-bottom: 10px;">
              <li>
                异常数据数量: {{ item.bad_count }}
              </li>
               <li>
                异常数据比例: {{ item.bad_percent*100 + '%' }}
              </li>
              <li>
                异常数据均值: {{ item.bad_data_mean}}
              </li>
              <li>
                正常数据均值: {{ item.good_data_mean }}
              </li>
              <li>
                数据相关性: {{ item.data_corr }}
              </li>
            </ul>
          </div>
        </el-card>

      </div>
    </div>
    <!--<el-button type="success" @click="errCheck">op</el-button>-->
    <!--<el-button type="success" @click="train">op</el-button>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          ph: '',
          disslove: '',
          nh: '',
          kmno: '',
          totalp: ''
        },
        isException: '',
        stations: [],
        dataCount: 0,
        errInfos: ''
      }
    },
    mounted() {
      this.errCheck()
    },
    methods: {
      errCheck() {
        this.$store.dispatch('algo/errCheck').then(response => {
          const data = response.obj
          this.errInfos = data
        })
      },
      train() {
        this.$store.dispatch('algo/trainIsoForest').then(response => {

        })
      },
      predict() {
        this.$store.dispatch('algo/isError', this.formInline).then(response => {
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

<style scoped>
  .algo {
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
  
  .box-card {
    width: 100%;
  }
</style>