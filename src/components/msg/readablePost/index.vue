<template>
  <div class="postList">
    <div style="height: 50px;width: 100%;background: #D9ECFF;padding: 13px;">
      信息列表
    </div>
    <div class="roof">
    </div>
    <div class="posts">
      <div v-for="(item,index) in postList" :key="item.postid" class="post">
        <div class="userInfoArea">
          <div class="title" @click="getPostDetail(item.postid)">
            <el-tag type="success" v-if="item.isRead == 1">已读</el-tag>
            <el-tag type="warning" v-if="item.isRead == 0">未读</el-tag>
            {{item.title | ellipsis}}
          </div>
          <div class="author">
            {{item.userinfo.name}}
          </div>
        </div>
        <div class="postInfoArea">
          <div class="content" style="width:80%;float:left">
            {{item.content | ellipsis}}
          </div>
          <div class="time">
            {{item.posttime}}
          </div>
        </div>
        <div :id="item.postid" v-if="item.imglist != ''" @click="enlarge(item.postid)">
          <img :src="item" v-for="(item,index) in item.imglist.split(',')" width="100px" height="100px" style="margin-right: 10px;cursor: zoom-in;" v-if="index < 5" />
        </div>
        <div class="operation" style="width: 100%;height: 50px;">
          <div style="float: right;">
            <el-button type="success" plain>收藏</el-button>
            <el-button type="danger" @click="deletePost(item.postid)"  plain>删除</el-button>
          </div>
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
        postList: '',
        viewer: ''
      }
    },
    inject: ['reload'],
    mounted() {
      this.getPostList()
    },
    methods: {
      getPostList() {
        const userId = sessionStorage.getItem("username")
        this.$store.dispatch('msg/getReadableMsg',userId).then(response => {
          this.postList = response.obj 
        })
      },
      getPostDetail(postId){
        this.$router.push("/msg/postDetail/"+postId)
      },
      enlarge(item){
        console.log(item)
        const viewDom = document.getElementById(item)
        this.viewer = new Viewer(viewDom,{
          initialViewIndex: 0,
          button: true, //右上角关闭按钮
          navbar: 2,
          title: 0,
          toolbar: 1,
          keyboard: true,
        })
      },
      deletePost(postId){
        const userId = sessionStorage.getItem("username")
        this.$store.dispatch('msg/deletePost',{'postId':postId,'userId':userId}).then(response => {
           this.$store.dispatch('msg/getUnReadMsgCountByUser').then(response => {
             this.$store.state.msg.currCount = response
           })
          if(response.status == 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.reload()
          }
        })
      },
      active(event){
        let posts = document.getElementsByClassName("post")
        for(let i=0;i<posts.length;i++){
          posts[i].classList.remove('activeDiv')
        }
        
        event.currentTarget.classList.add('activeDiv')
      }
    }
  }
</script>

<style scoped>
  .postList {
    background-color: #FFFFFF;
    width: 100%;
  }
  
  .post {
    border-bottom: 1px solid #F0F0F0;
    width: 100%;
    padding: 20px;
  }
  
  .title{
    width:80%;
    float: left;
    color: blue;
    cursor: pointer;
  }
  
  .author{
    width:19%;
    float: right;
    color: #8C939D;
  }
  
  .userInfoArea{
    width: 100%;
    height: 30px;
  }
  
  .postInfoArea{
    width: 100%;
    height: 30px;
  }
  
  .time{
    width:19%;
    float: right;
    color: #8C939D;
  }
  
  .imgsArea{
    width: 100%;
    height: 120px;
    margin-top: 10px;
  }
  
  .activeDiv{
    background-color: #e8e8ff;
  }
</style>