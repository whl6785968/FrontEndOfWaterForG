<template>
  <div class="userinfo">
    <div class="avatar">
      <img src="../../../static/moon.png" class="user-avatar" />
      <div><font color="#8CC5FF" size="5">{{ user_info.name}}</font></div>
      <div>{{ role == 'ROLE_ADMIN'? '管理员':'普通用户' }}</div>
    </div>
    <div style="border-bottom: 1px solid #ECECEC;margin-bottom: 20px;"></div>
    <div class="info">
      <el-form :model="ruleForm" status-icon ref="ruleForm" :rules='rules' label-width="100px" class="demo-ruleForm" label-position='left'>
        <el-form-item label="姓         名">
          <el-input v-model="ruleForm.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="年         龄" >
          <el-input v-model="ruleForm.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="link">
          <el-input v-model="ruleForm.link" autocomplete="off" :placeholder="user_info.link"></el-input>
        </el-form-item>
        <el-form-item label="描       述" prop='descr'>
          <el-input type="textarea" :rows="2"  v-model="ruleForm.descr">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存信息</el-button>
          <el-button @click="dialogVisible = true ">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :modal-append-to-body = false 
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-form :model="passForm" status-icon :rules="passRules" ref="passForm" label-width="100px" class="demo-passForm" label-position='left'>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="passForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click="updatePassword('passForm')">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      let checkNumber = (rule,value,callback) => {
        if(!value){
          return callback(new Error('联系方式不能为空'))
        }
        else{
          if(!(/^1[^0-2]\d{9}$/).test(value)){
            callback(new Error('请输入正确的手机号码'))
          }
          else{
            callback()
          }
        }
      };
      
      let checkDecr = (rule,value,callback) => {
        if(value.length > 20){
          callback(new Error('字数限制在20个'))
        }
        else{
          callback()
        }
      }
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passForm.checkPass !== '') {
            this.$refs.passForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
      return {
        username: '',
        user_info: '',
        ruleForm: {
          name: '',
          link: '',
          age: '',
          descr: ''
        },
        dialogVisible: false,
        role: '',
        rules: {
          link: [
            {validator: checkNumber,trigger: 'blur'}
          ],
          descr: [
            {validator: checkDecr,trigger:'blur'}
          ],
        },
        passRules: {
           pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        passForm: {
          pass: '',
          checkPass: ''
        }
      }
    },
    created() {
      this.load_info()
    },
    inject:['reload'],
    methods: {
      load_info() {
        this.username = sessionStorage.getItem('username')
        this.$store.dispatch('user/getUserInfo', this.username).then(response => {
          const data = response.obj
          this.user_info = data
          this.ruleForm.name = this.user_info.name
          this.ruleForm.age = this.user_info.age
          this.ruleForm.link = this.user_info.link
          this.ruleForm.descr = this.user_info.descr
        })
        this.$store.dispatch('user/getRoleByUserId',this.username).then(response => {
          this.role = response.role_name
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            const link = this.ruleForm.link
            const descr = this.ruleForm.descr
            const userid = this.username
            
            const info = {
              link: link,
              descr: descr,
              userid: userid
            }
            
            this.$store.dispatch('user/updateUserInfo',info).then(response => {
              if(response.status == 200){
                this.$message({
                  message: response.msg,
                  type: 'success'
                })
                this.reload()
              }
              else{
                this.$message({
                  message: response.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      updatePassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const userid = this.username
            const password = this.passForm.pass
            const info = {
              userid:userid,
              password:password
            }
            this.$store.dispatch('user/updatePassword',info).then(response => {
              if(response.status == 200){
                this.$message({
                  message: response.msg,
                  type: 'success'
                })
                this.reload()
              }
              else{
                this.$message({
                  message: response.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
     
    }
  }
</script>

<style scoped="scoped">
  .userinfo {
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
    text-align: center;
  }
  
  .user-avatar {
    height: 100px;
    width: 100px;
  }
  
  .avatar {
    width: 100%;
    text-align: center;
  }
  
  .info {
    width: 100%;
    text-align: center;
  }
  
  .demo-ruleForm {
    margin-left: 430px;
    width: 500px;
  }
</style>