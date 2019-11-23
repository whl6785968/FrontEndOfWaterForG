<template>
  <div class="postDetail">
    <div class="postInfo">
      <div class="back">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
      </div>
    </div>
    <div class="title">
      {{postInfo.title}}
    </div>
    <div class="landlord">
      <div class="userInfo" ref="userInfo">
        <div class="avatar" ref="avatar" style="width: 100px;height: 100px;border: 1px solid #D9D9D9;vertical-align: middle);">
          <img src="../../../../build/logo.png" height="100px" width="100px" />
        </div>
        <div ref="userName" style="margin-top:10px ;">
          <a href="www.baidu.com" v-if="postInfo.userinfo">{{postInfo.userinfo.name}}</a>
        </div>
        <div ref="userDesc" style="margin-top:10px ;" v-if="postInfo.userinfo">{{postInfo.userinfo.descr}}</div>
      </div>
      <div class="content" ref="content">
        <p>{{postInfo.content}}</p>
        <div id="imgDom" @click="enlarge()" v-if="imgLists != '' && imgLists != null && imgLists.length != 0">
          <img :src="item" :key="index"  v-for="(item,index) in imgLists" width="80%" height="300px"/>
        </div>     
      </div>
    </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  
  export default {
    data() {
      return {
        postId: this.$route.params.id,
        postInfo: '',
        imgLists: [],
        changeValue: null,
        ee: 0,
        viewer: ''
      }
    },
    mounted() {
      this.getUnReviewMsgDetail()
//    setTimeout(() => {
//      this.changeValue = 1
//      this.$nextTick(() => {
//       this.calcHeight()
//      })
//    }, 0)

    },
    updated() {
      this.calcHeight()
    },
    
    methods: {
      getUnReviewMsgDetail() {
        this.$store.dispatch('msg/getUnReviewMsgDetail', this.postId).then(response => {
          const currRole = sessionStorage.getItem("role")
          
          if(currRole != 'ROLE_ADMIN' && response.obj.isreviewd == 0){
            this.$message({
              message: "权限不够",
              type: 'error'
            })
            return
          }
          this.postInfo = response.obj
          const imgLists = this.postInfo.imglist.split(',')
          if(imgLists != ''){
             for(let i = 0;i<imgLists.length;i++){
               imgLists[i] = '../../../../..'+imgLists[i]
             }
          }   
          this.imgLists = imgLists
        })
      },
      goBack() {
        if(window.history.length <= 1) {
          this.$router.push({
            path: '/home'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      calcHeight(){        
       const userInfoH =  this.$refs.userInfo.offsetHeight
       const contentH = this.$refs.content.offsetHeight
       const unifiedH = userInfoH > contentH ? userInfoH :contentH
       this.$refs.userInfo.style.height = (unifiedH + 100) + "px"
       this.$refs.content.style.height = (unifiedH + 100) +"px"
//     alert(unifiedH)
      },
      enlarge(){
        const viewDom = document.getElementById('imgDom')
        this.viewer = new Viewer(viewDom,{
          initialViewIndex: 0,
          button: true, //右上角关闭按钮
          navbar: 2,
          title: 0,
          toolbar: 1,
          keyboard: true,
        })
      }
    }
  }
</script>

<style scoped>
  .postDetail {
    width: 100%;
    background-color: #FFFFFF;
    /*padding: 32px;*/
  }
  
  .title {
    width: 100%;
    height: 50px;
    /*border-top: 1px solid red;*/
    line-height: 8px;
    border-bottom: 1px solid #A6A9AD;
    padding: 20px;
  }
  
  .postInfo {
    padding: 20px;
    width: 100%;
    background-color: #B3D8FF;
  }
  
  .landlord {
    width: 100%;
    border-bottom: 1px solid #A6A9AD;
  }
  
  .userInfo {
    width: 12%;
    float: left;
    background-color: rgb(252, 252, 252);
    /*border: 1px solid red;*/
    padding: 25px;
    text-align: center;
  }
  
  .content {
    width: 88%;
    float: right;
    background-color: #FFFFFF;
    padding: 20px;
  }
  
  #imgDom{
    /*height: 300px;*/ 
    cursor:zoom-in;
  }
</style>