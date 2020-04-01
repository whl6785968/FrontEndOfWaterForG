<template>
  <div class="auth">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <el-tag>{{scope.row.userId}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-tag>{{scope.row.role_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-has="['ROLE_ADMIN','ROLE_CLIENT']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible" :modal="false" style="margin-left: 170px;margin-top: 10px;">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled :placeholder="this.form.id" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" disabled :placeholder="this.form.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="ROLE_ADMIN" value="777"></el-option>
            <el-option label="ROLE_CLIENT" value="001"></el-option>
            <el-option label="ROLE_VISITOR" value="002"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import has from '@/directive/permissions.js'
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          username: '',
          role: '',
          id: ''
        },
        formLabelWidth: '120px',

      }
    },
    mounted() {
      this.initData()
    },
    inject: ['reload'],
    methods: {
      handleEdit(index, row) {
        //      console.log(index, row)
        this.dialogFormVisible = true
        const user_id = row.userId
        this.form.username = user_id
        this.form.id = row.id

      },
      handleDelete(index, row) {
        console.log(index, row)
        alert(row.userId)
      },
      initData() {
        this.$store.dispatch('user/getUserRole').then(response => {
          if(response) {
            this.tableData = response
          }
        })
      },
      submitForm(form) {
        this.$store.dispatch('user/changeRole', form).then(response => {
          if(response == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.reload()
          }
        })

      }
    }
  }
</script>

<style>
  .auth {
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>