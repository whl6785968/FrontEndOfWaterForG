<template>
  <div class="post">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-checkbox-group v-model="sizeForm.type">
          <el-checkbox-button label="设备故障" name="type"></el-checkbox-button>
          <el-checkbox-button label="水质异常" name="type"></el-checkbox-button>
          <el-checkbox-button label="其他" name="type"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否紧急">
        <el-switch v-model="sizeForm.isEmergency"></el-switch>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
            action="/uploadPic"
            :headers="headers"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="sizeForm.content" size="medium"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          type: [],
          isEmergency:false,
          content: '',
          imgList: [],
          uid: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        headers: {'X-Token':getToken()}
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        if(this.sizeForm.isEmergency){
          this.sizeForm.isEmergency = 1
        }
        else{
          this.sizeForm.isEmergency = 0
        }

        this.sizeForm.uid = this.$store.state.user.id
        
        this.$store.dispatch('msg/posting',this.sizeForm).then(response => {
          if(response.status = 200){
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.sizeForm.isEmergency = false
            this.sizeForm.uid = ''
            this.$store.dispatch('msg/send')
            const role = sessionStorage.getItem("role")
            if(role == 'ROLE_ADMIN'){
              this.$router.push('/msg/review')
            }
            else{
              this.$router.push('/msg/readablePost')
            } 
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.$store.dispatch('msg/deleteFile',file.response.obj).then(response => {
          if(response.status == 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response,file,fileList){
        this.sizeForm.imgList.push(response.obj)
      }
      
    }
  };
</script>

<style>
  .post{
     background-color: #FFFFFF;
     padding: 32px;
  }
</style>