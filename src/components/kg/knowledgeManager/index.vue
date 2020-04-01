<template>
  <div class="knowledgeManager">
    <div class="tools">
      <div class="conditionalSearch" style="float: left;">
        <el-input v-model="entityName" placeholder="请输入实体名称" style="width: 200px;"></el-input>
        <el-input v-model="entityAmbiguous" placeholder="请输入实体歧义" style="width: 200px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible3=true">添加</el-button>
      </div>
      <div style="float: right;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="default_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
        </el-pagination>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed label="实体编号" prop="entityId" width="150" align='center'>
      </el-table-column>
      <el-table-column label="实体名称" width="300" align="center">
        <template slot-scope="scope">
          {{eliminateEli(scope.row.entityName) | ellipsis}}
        </template>
      </el-table-column>
      <el-table-column label="实体歧义" width="300" align="center">
        <template slot-scope="scope">
          {{eliminateEli(scope.row.entityAmbiguous)}}
        </template>
      </el-table-column>
      <el-table-column label="实体类别" width="300" align="center">
        <template slot-scope="scope">
          {{scope.row.entity_label}}
        </template>
      </el-table-column>
      <el-table-column label="实体链接" width="200" align="center">
        <template slot-scope="scope">
          {{eliminateEli(scope.row.entityLink)}}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button @click="relationManager(scope.row)" type="text" size="small">关系管理</el-button>
          <el-button type="text" size="small">知识管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--:title="relationTitle"-->
    <el-dialog :visible.sync="dialogTableVisible" :modal-append-to-body="false" style="height: 800px;margin-left: 200px;margin-top: -100px;" width="95%" @open="getRelation">
      <div style="margin-bottom: 20px;margin-top: -30px;">
        <font size="4">{{relationTitle | ellipsis}}</font>
        <el-button type="primary" icon="el-icon-plus" size="medium" style="margin-left: 25px;" @click="dialogFormVisible2=true">创建</el-button>
      </div>
      <el-table :data="relationData" :border='false' style="width: 100%">
        <!--<el-table-column fixed prop="date" label="日期" width="150">
        </el-table-column>-->
        <el-table-column prop="entityId" label="实体编号" width="80" align='center'>
        </el-table-column>
        <el-table-column label="实体名称" width="120" align='center'>
          <template slot-scope="scope">
            {{eliminateEli(scope.row.entity) | ellipsis}}
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
            {{eliminateEli(scope.row.value) | ellipsis}}
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
            {{eliminateEli(scope.row.desc) | ellipsis}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align='center'>
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button icon="el-icon-edit" plain size='mini'></el-button>
            <el-button icon="el-icon-delete" plain size='mini'></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--添加关系-->
    <el-dialog title="添加关系" :visible.sync="dialogFormVisible2" @open="openAdd" :modal-append-to-body="false" style="margin-top: -100px;margin-left: 120px;">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="width: 500px;margin-left: 100px;">
        <el-form-item label="实体名称">
          <el-input v-model="sizeForm.entity"></el-input>
        </el-form-item>
        <el-form-item label="实体歧义">
          <el-input v-model="sizeForm.entityAmbiguous" disabled></el-input>
        </el-form-item>
        <el-form-item label="实体链接">
          <el-input v-model="sizeForm.entityLink" disabled></el-input>
        </el-form-item>
        <el-form-item label="实体标签">
          <el-radio-group v-model="sizeForm.startLabel" size="medium" style="width: 500px;" disabled>
            <el-radio :border='true' label="站点"></el-radio>
            <el-radio border label="区域"></el-radio>
            <el-radio border label="知识"></el-radio>
            <el-radio border label="企业"></el-radio>
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
          <el-radio-group v-model="sizeForm.endLabel" size="medium" style="width: 500px;">
            <el-radio :border='true' label="站点"></el-radio>
            <el-radio border label="区域"></el-radio>
            <el-radio border label="知识"></el-radio>
            <el-radio border label="企业"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="sizeForm.des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createRelation">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加实体" :visible.sync="dialogFormVisible3" :modal-append-to-body="false" style="margin-top: -100px;margin-left: 120px;">
      <el-form ref="form2" :model="entityForm" label-width="80px" size="mini" style="width: 500px;margin-left: 100px;">
        <el-form-item label="实体名称">
          <el-input v-model="entityForm.entityName"></el-input>
        </el-form-item>
        <el-form-item label="实体歧义">
          <el-input v-model="entityForm.entityAmbiguous"></el-input>
        </el-form-item>
        <el-form-item label="实体链接">
          <el-input v-model="entityForm.entityLink"></el-input>
        </el-form-item>
        <el-form-item label="实体标签">
          <el-radio-group v-model="entityForm.label" size="medium" style="width: 500px;">
            <el-radio :border='true' label="站点"></el-radio>
            <el-radio border label="区域"></el-radio>
            <el-radio border label="知识"></el-radio>
            <el-radio border label="企业"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addEntity">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        entityAmbiguous: '',
        entityName: '',
        dialogTableVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        relationTitle: '',
        currentEntityId: '',
        currentEntityName: '',
        relationData: [],
        currentEntity: '',
        currentPage: 1,
        default_pageSize: 10,
        totalPage: 0,
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
        },
        entityForm: {
          entityName: '',
          entityAmbiguous: '',
          entityLink: '',
          label: ''
        }
      }
    },
    mounted() {
      this.initData()
    },
    inject: ['reload'],
    methods: {
      initData() {
        const infos = {
          entityName: this.entityName,
          entityAmbiguous: this.entityAmbiguous,
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('kg/getEntities', infos).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.totalCount
        })
      },
      eliminateEli(x) {
        //      alert(x)
        x = x.replace(/\"/g, '')
        return x
      },
      search() {
        this.currentPage = 1
        this.initData()
        //       this.reload()
      },
      relationManager(row) {
        this.dialogTableVisible = true
        this.relationTitle = this.eliminateEli(row.entityName) + '的关系管理'
        this.currentEntityId = row.entityId
        this.currentEntityName = row.entityName
        this.currentEntity = row
      },
      getRelation() {
        //      const infos = {
        //        entityName: this.currentEntityName,
        //        entityId: this.currentEntityId
        //      }
        this.$store.dispatch('kg/getRelation', this.currentEntityId).then(response => {
          this.relationData = response.obj
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.default_pageSize = val
        const infos = {
          entityName: this.entityName,
          entityAmbiguous: this.entityAmbiguous,
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('kg/getEntities', infos).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.totalCount
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        const infos = {
          entityName: this.entityName,
          entityAmbiguous: this.entityAmbiguous,
          page: this.currentPage,
          pageSize: this.default_pageSize
        }
        this.$store.dispatch('kg/getEntities', infos).then(response => {
          this.tableData = response.obj.list
          this.totalPage = response.obj.totalCount
        })
      },
      openAdd() {
        this.sizeForm.entity = this.eliminateEli(this.currentEntity.entityName)
        this.sizeForm.entityAmbiguous = this.eliminateEli(this.currentEntity.entityAmbiguous)
        this.sizeForm.entityLink = this.eliminateEli(this.currentEntity.entityLink)
        this.sizeForm.startLabel = this.currentEntity.entity_label[1]
      },
      createRelation() {
        this.$store.dispatch('kg/save', this.sizeForm).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      },
      addEntity() {
        this.$store.dispatch('kg/createEntitiy', this.entityForm).then(response => {
          this.$message.success(response.msg)
          this.reload()
        })
      },
      judgeDirect(str) {
        if(str.contains('被')) {
          return 1
        }
      }

    }
  }
</script>

<style>
  .conditionalSearch {
    
  }
  
  .tools{
    background-color: #FFFFFF;
    padding: 32px;
    height: 130px;
  }
</style>