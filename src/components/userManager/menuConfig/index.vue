<template>
  <div class="menuConfig">
    <div class="menuConfigByRole" >
      <el-collapse accordion @change="collapseChange" v-model="activeColItem">
        <el-collapse-item v-for="(item,index) in roles" :key="index" :name="item.roleid">
          <template slot="title">
            {{item.roleName}}<i class="header-icon el-icon-info"></i>
          </template>
          <div class="menu-tree">
            <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" ref="tree" highlight-current :default-checked-keys="checkedKeys">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.title }}</span>
              </span>
            </el-tree>
          </div>
          <div style="display:block;margin-left: 150px">
              <!--@click="cancelUpdateRoleMenu"-->
              <el-button size="mini" @click="cancelUpdateRoleMenu">取消修改</el-button>
              <el-button type="primary" size="mini" @click="updateRoleMenu(index)">确认修改</el-button>
            </div>       
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import { initmenu } from '@/utils/menuUtil'
  import { getToken } from '@/utils/auth'
  export default {
    data(){
      return {
          roles: '',
          activeColItem: -1,
          data: [],
          checkedKeys: []
      }
    },
    inject:['reload','reloadNevigate'],
    mounted(){
      this.initRoles()
    },
    methods: {
      initRoles(){
        this.$store.dispatch('menu/getRoles').then(response => {
          this.roles = response
        })
      },
      collapseChange(activeNames){
        if(activeNames == ''){
          return ;
        }
        this.$store.dispatch('menu/getAllMenuTree',activeNames).then(response => {
          this.data = response.menus
          this.checkedKeys = response.mids
        })
      },
      cancelUpdateRoleMenu(){
        this.activeColItem = -1
      },
      updateRoleMenu(index){
        const checkedKeys = this.$refs.tree[index].getCheckedKeys(true)
        const tmp_id = this.activeColItem
        const menuData = {
          role_id: this.activeColItem,
          mids: checkedKeys
        }   
        this.$store.dispatch('menu/updateRoleMenu',menuData).then(response => {
          if(response.status == 200){
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            
            this.reload()
            const hasToken = getToken()
            this.$store.dispatch('user/getInfo',hasToken).then(response => {
              const userid = response.obj
              initmenu(this.$router,this.$store,userid)
            })
            
            this.reloadNevigate()
//          this.$router.go(0)
          
          }
        })
      }
      
    }
  }
</script>

<style>
  .menuConfig{
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
  
  .menuConfigByRole{
    height: 500px;
    width:100%
  }
</style>