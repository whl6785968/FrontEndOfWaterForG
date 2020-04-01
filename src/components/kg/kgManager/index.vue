<template>
  <div class="kgManager">
    <div class="tool" style="padding: 32px;float: right;">
      <div>
        <el-input v-model="entityName" placeholder="请输入内容" style="width: 300px;"></el-input>
        <el-button round type='primary' icon="el-icon-search" @click='init_data'>查询</el-button>
        <el-button round type='primary' icon='el-icon-circle-plus' @click="dialogFormVisible=true">添加</el-button>
      </div>
    </div>
    <div class="kgTable">
      <el-table :data="tableData" border style="width: 100%">
        <!--<el-table-column fixed prop="date" label="日期" width="150">
        </el-table-column>-->
        <el-table-column prop="entityId" label="实体编号" width="80" align='center'>
        </el-table-column>
        <el-table-column label="实体名称" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.entity)}}
          </template>
        </el-table-column>
        <el-table-column prop="entityAmbiguous" label="实体歧义" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.entityAmbiguous)}}
          </template>
        </el-table-column>
        <el-table-column prop="entityLink" label="实体链接" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.entityLink)}}
          </template>
        </el-table-column>
        <el-table-column prop="relationId" label="关系编号" width="80" align='center'>
        </el-table-column>
        <el-table-column prop="relation" label="关系" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.relation)}}
          </template>
        </el-table-column>
        <el-table-column prop="valueId" label="值编号" width="80" align='center'>
        </el-table-column>
        <el-table-column prop="value" label="值" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.value)}}
          </template>
        </el-table-column>
        <el-table-column prop="valueAmbiguous" label="值歧义" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.valueAmbiguous)}}
          </template>
        </el-table-column>
        <el-table-column prop="valueLink" label="值链接" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.valueLink)}}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="200" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.desc)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align='center'>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="showKg"></div>

    <el-dialog title="添加实体" :visible.sync="dialogFormVisible" :modal-append-to-body="false" style="margin-top: -100px;margin-left: 120px;">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="width: 500px;margin-left: 140px;">
        <el-form-item label="实体名称">
          <el-input v-model="sizeForm.entity"></el-input>
        </el-form-item>
        <el-form-item label="实体歧义">
          <el-input v-model="sizeForm.entityAmbiguous"></el-input>
        </el-form-item>
        <el-form-item label="实体链接">
          <el-input v-model="sizeForm.entityLink"></el-input>
        </el-form-item>
        <el-form-item label="实体标签">
          <el-radio-group v-model="sizeForm.startLabel" size="small">
            <el-radio :border='true' label="站点"></el-radio>
            <el-radio border label="区域"></el-radio>
            <el-radio border label="常识"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="sizeForm.relation"></el-input>
        </el-form-item>
        <el-form-item label="值名称">
          <el-input v-model="sizeForm.value"></el-input>
        </el-form-item>
        <el-form-item label="值歧义">
          <el-input v-model="sizeForm.valueAmbiguous"></el-input>
        </el-form-item>
        <el-form-item label="值链接">
          <el-input v-model="sizeForm.valueLink"></el-input>
        </el-form-item>
        <el-form-item label="值标签">
          <el-radio-group v-model="sizeForm.endLabel" size="medium">
            <el-radio :border='true' label="站点"></el-radio>
            <el-radio border label="区域"></el-radio>
            <el-radio border label="常识"></el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="描述">
            <el-input type="textarea" v-model="sizeForm.des"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.init_data()
    },
    inject: ['reload'],
    methods: {
      handleClick(row) {
        console.log(row);
      },
      init_data() {
        const infos = {
          entityName: this.entityName,
          entityId: ''
        }
        this.$store.dispatch('kg/search2', infos).then(response => {
          //        alert(response.status)
          this.tableData = response.obj
        })
      },
      eliminateEli(x) {
        //      alert(x)
        x = x.replace(/\"/g, '')
        return x
      },
      save(){
        this.$store.dispatch('kg/save',this.sizeForm).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      }
    },

    data() {
      return {
        tableData: [],
        entityName: '',
        dialogFormVisible: false,
        sizeForm: {
          entity: '',
          entityAmbiguous: '',
          entityLink: '',
          startLabel: '',
          relation: '',
          des: '',
          value: '',
          valueAmbiguous: '',
          valueLink: '',
          endLabel: ''
          
        }
      }
    }
  }
</script>

<style scoped>
  .kgManager {
    width: 100%;
    background-color: #FFFFFF;
  }
  
  .kgTable {
    /*float: left;
    width: 49%;*/
  }
  /*.showKg {
    float: right;
    width: 49%;
  }*/
</style>