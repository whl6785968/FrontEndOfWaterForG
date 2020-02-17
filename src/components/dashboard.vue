<template>
  <div class="dashboard">
    <el-aside :style="{width:ee+'px'}" ref="scrollBar">
      <!--@open="handleOpen" @close="handleClose"-->
      <el-menu v-if="isMenuAlive" :collapse="isCollapse" :default-active="activeIndex" :router="true" unique-open class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="(item,index) in this.routes" v-if="item.hidden != true">
          <el-submenu :key="index" :index="index+''">
            <template slot="title">
              <!--<i :class="item.iconCls"></i>-->
              <i class="el-icon-edit"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item v-for="(child,index) in item.children" :index="child.path" :key="child.path" v-if="child.meta.enable == 1">{{child.meta.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="main-container" :style="{'margin-left':ee+'px'}">
      <div style="position: relative;">
        <el-card class="header-card">
          <div class="humbger-container">
            <i class="el-icon-s-fold" v-if="!isCollapse" @click="collapse" style="font-size: 25px;"></i>
            <i class="el-icon-s-unfold" v-if="isCollapse" @click="collapse" style="font-size: 25px;"></i>
          </div>
          <div class="breadcrumb-container">
            <breadcrumb></breadcrumb>
          </div>
          <div class="avatar-container">
            <el-badge :value="this.$store.state.msg.currCount" :max="99" class="item">
              <i class="el-icon-message-solid" style="font-size: 22px;cursor: pointer;" @mouseover="hover($event)" @mouseleave="leave($event)" @click="pushIntoMsg"></i>
            </el-badge>
            <el-dropdown>
              <img src="../../static/moon.png" class="user-avatar" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link to="/userinfo">个人中心</router-link></el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <span style="display:block;" @click="logout">
                        <el-dropdown-item divided>注销</el-dropdown-item>
                      </span>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <i class="el-icon-caret-bottom" style="cursor: pointer;"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <span style="display:block;" @click="logout">
                        <el-dropdown-item divided>注销</el-dropdown-item>
                      </span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>
      </div>
      <el-main>
        <transition>
          <router-view v-if="isRouterAlive"></router-view>
        </transition>
      </el-main>
      <el-footer>
        <div style="line-height: 10px;padding: 10px;margin-left: 150px;">
          <span><p><strong>版权所有:</strong>Sandalen</p></span>
          <span><strong>github:</strong><a href="https://github.com/whl6785968">https://github.com/whl6785968</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>blog:</strong>https://blog.csdn.net/qq_34661106</span>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { removeToken } from '@/utils/auth'
  import breadcrumb from '@/components/breadcrumb.vue'
  export default {
    data() {
      return {
        activeIndex: '2',
        isCollapse: false,
        ee: 200,
        mContainer: 190,
        isRouterAlive: true,
        isMenuAlive: true,
        unReadMsgCount: 0
      }
    },
    provide() {
      return {
        reload: this.reload,
        reloadNevigate: this.reloadNevigate
      }
    },
    mounted(){
      this.getUnReadMsgCountByUser()
    },
    destroyed(){
      this.closeConnect()
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse
        if(this.isCollapse == true) {
          this.ee = 54
          //        this.mContainer = 44
        } else {
          this.ee = 200
          //        this.mmContainer = 190
        }
      },
      logout() {
        removeToken()
        this.$router.push('/login')
        this.$message.success("登出成功")
      },
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      reloadNevigate() {
        this.isMenuAlive = false
        this.$nextTick(function() {
          this.isMenuAlive = true
        })
      },
      getUnReadMsgCountByUser(){
        this.$store.dispatch('msg/getUnReadMsgCountByUser').then(response =>{
          this.unReadMsgCount = response
          this.$store.dispatch('msg/connect',response)
        })
      },
      closeConnect(){
        this.$store.dispatch('msg/closeConnect')
      },
      pushIntoMsg(){
        this.$router.push('/msg/readablePost')
      },
      hover(event){
        let infoBell = document.getElementsByClassName("el-icon-message-solid")
        event.currentTarget.classList.add('activeDiv')
      },
      leave(event){
        event.currentTarget.classList.remove('activeDiv')
      }
    },
    watch: {
      routes: function(val) {},
      changeMsg: function(val){
        if(val > this.$store.state.msg.currCount){
          this.$notify.info({
            title: '消息',
            message: '您有一条新的消息'
          });
          this.$store.state.msg.currCount = val
        }
      }     
    },
    computed: {
      routes() {
        return this.$store.state.routes
      },
      changeMsg(){
        return this.$store.state.msg.noticeCount
      }
    },
    components: {
      'breadcrumb': breadcrumb
    }
  }
</script>

<style>
  .header-card {
    position: relative;
    overflow: hidden;
    height: 60px;
    margin-left: 0;
    margin-right: -10px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }
  
  .el-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #B3C0D1;
    text-align: center;
    line-height: 60px;
    width: 100%;
    z-index: 999;
  }
  
  .el-aside {
    /*width: 200px !important;*/
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    overflow: hidden;
  }
  
  .el-aside .el-menu-vertical-demo {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  
  .el-main {
    width: 100%;
    position: relative;
    margin-bottom: 50px;
    /*overflow: hidden;*/
    /*left: -6px;*/
    background-color: #f0f2f5;
  }
  
  .humbger-container {
    /*padding: 0px 10px;*/
    margin-top: -1px;
    line-height: 10px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
  }
  
  .main-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    /*overflow: hidden;*/
    transition: margin-left .28s;
    border: 1px black solid;
  }
  
  .avatar-container {
    margin-right: 30px;
    display: inline-block;
    /*padding: -5px 3px;*/
    height: 100%;
    vertical-align: text-bottom;
    float: right;
    margin-top: -8px;
    margin-right: -5px;
  }
  
  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border-style: none;
  }
  
  .breadcrumb-container {
    float: left;
    display: inline-block;
    font-size: 14px;
    margin-left: 15px;
    margin-top: -8px;
  }
  
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  
  .activeDiv{
    color: cornflowerblue;
  }
</style>